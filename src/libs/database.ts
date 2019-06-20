import mariadb, { Connection, Pool, PoolConfig } from 'mariadb'

export default class Database {
  private pool: Pool

  constructor(config: string | PoolConfig) {
    this.pool = mariadb.createPool(config)
  }

  async getConnection() {
    try {
      return await this.pool.getConnection()
    } catch (error) {
      throw error
    }
  }

  async query(sql: string, params?: any, options = {}) {
    console.log(sql, '\n', params)
    let connection: Connection

    try {
      connection = await this.getConnection()
      const namedPlaceholders = !Array.isArray(params)
      return await connection.query({ sql, namedPlaceholders, ...options }, params)
    } catch (error) {
      throw error
    } finally {
      if (connection) {
        connection.end()
      }
    }
  }

  async select(fields: string | string[], table: string, where?: any, orderBy?: string, limit?: number | number[]) {
    const params = {}
    let sql = `SELECT ${fields} \nFROM ${table}`

    if (where) {
      where = this.buildCondition(where, params)
      sql += `\nWHERE ${where}`
    }
    if (orderBy) {
      sql += `\nORDER BY ${orderBy}`
    }
    if (limit) {
      sql += `\nLIMIT ${limit}`
    }

    return this.query(sql, params)
  }

  async insert(table: string, params: any, onDuplicateUpdate = false) {
    const data = Object.keys(params).map((key) => {
      return `${key} = :${key}`
    })

    let sql = `INSERT INTO ${table} \nSET ${data}`

    if (onDuplicateUpdate) {
      sql += `\nON DUPLICATE KEY UPDATE \n${data}`
    }

    return this.query(sql, params)
  }

  async update(table: string, data: any, where?: any) {
    let params = {}

    if (typeof data === 'object' && !Array.isArray(data)) {
      params = data
      data = Object.keys(data).map((key) => {
        return `${key} = :${key}`
      })
    }

    let sql = `UPDATE ${table} \nSET ${data}`

    if (where) {
      where = this.buildCondition(where, params)
      sql += `\nWHERE ${where}`
    }

    return this.query(sql, params)
  }

  async delete(table: string, where?: any) {
    let sql = `DELETE FROM ${table}`
    const params = {}

    if (where) {
      where = this.buildCondition(where, params)
      sql += `\nWHERE ${where}`
    }

    return this.query(sql, params)
  }

  buildCondition(where: any, params: Dictionary<any> = {}): string {
    if (Array.isArray(where)) {
      const result = where.map((item) => {
        return this.buildCondition(item, params)
      })
      return `(${result.join(')\nAND (')})`
    } else if (typeof where === 'object') {
      const result = Object.keys(where).map((key) => {
        params[key] = where[key]
        return `${key} = :${key}`
      })
      return `(${result.join(')\nAND (')})`
    } else {
      return where
    }
  }
}
