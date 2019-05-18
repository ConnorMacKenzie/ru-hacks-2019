COPY (
  SELECT row_to_json(db_dump) FROM (
    SELECT
      AvgPrice
      Total_Quantity
    FROM data
  ) fruit_data
) TO 'a.file';