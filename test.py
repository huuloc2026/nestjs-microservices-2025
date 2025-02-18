def tim_gia_tri(danh_sach, gia_tri):
    for phan_tu in danh_sach:
        if phan_tu == gia_tri:
            return phan_tu
    return None  # Trả về None nếu không tìm thấy giá trị

ket_qua = tim_gia_tri([1, 2, 3], 3)
if ket_qua is None:
    print("Không tìm thấy giá trị")
else:
    print("Tìm thấy giá trị:", ket_qua)