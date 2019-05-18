def serialize_per_month(data, month, buysell):
    dto = {
        "month": month,
        buysell: []
    }
    for i in data:
        dto[buysell].append({
            "id": i[1],
            "average_price": float(round(i[0], ndigits=2))
        })
    return dto
