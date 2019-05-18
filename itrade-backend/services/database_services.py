import psycopg2
import psycopg2.extensions
import traceback

def price_per_seller_per_month(args):
    query  = """SELECT AVG(Order_Price), SELLERID """
    query += """FROM supplychain """
    query += """WHERE AUDIT_MTH = %s """
    query += """GROUP BY SELLERID """
    query += """ORDER BY SELLERID ASC;"""
    return execute(query, args)

def execute(query, args):
    try:
        connection = psycopg2.connect(user = "postgres",
                                      password = "postgres",
                                      host = "127.0.0.1",
                                      port = "5432",
                                      database = "postgres")
        psycopg2.extensions.register_type(psycopg2.extensions.BYTES, connection)
        cursor = connection.cursor()
        print ("[INFO] Connecting to PostgreSQL")
        cursor.execute(query, args)
        print("[INFO] Executing query: " + cursor.query.decode('utf-8'))
        return cursor.fetchall()
    except (Exception, psycopg2.Error) as error :
        print ("[Error]", traceback.format_exc())
    finally:
        #closing database connection.
            if(connection):
                cursor.close()
                connection.close()
                print("[INFO] PostgreSQL connection is closed")
