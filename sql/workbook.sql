SELECT AVG(Order_Price), categoryname, SELLERID
FROM supplychain
WHERE AUDIT_MTH = 'jan-16'
GROUP BY categoryname, SELLERID
ORDER BY SELLERID ASC
LIMIT(10);
