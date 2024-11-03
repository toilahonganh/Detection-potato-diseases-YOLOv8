import os
import shutil

# Đường dẫn đến thư mục chứa hình ảnh gốc
source_folder = r'D:\Workplace\PlantVillage\Potato___healthy'

# Đường dẫn đến thư mục đích nơi lưu trữ hình ảnh đã được đổi tên
destination_folder = r'D:\Workplace\PlantVillage\Early'

# Tên đối tượng bạn muốn sử dụng cho các hình ảnh
object_name = 'healthy'

# Kiểm tra và tạo thư mục đích nếu nó chưa tồn tại
if not os.path.exists(destination_folder):
    os.makedirs(destination_folder)

# Lấy danh sách các tệp trong thư mục gốc
files = os.listdir(source_folder)

# Đếm số lượng ảnh đã xử lý
counter = 1

# Lặp qua từng tệp trong thư mục gốc
for file_name in files:
    # Đảm bảo tệp không phải là thư mục và có phần mở rộng hợp lệ
    if os.path.isfile(os.path.join(source_folder, file_name)):
        # Lấy phần mở rộng của tệp
        file_extension = os.path.splitext(file_name)[1]
        
        # Kiểm tra nếu phần mở rộng là một định dạng hình ảnh phổ biến
        if file_extension.lower() in ['.jpg', '.jpeg', '.png', '.bmp', '.gif']:
            # Tạo tên mới cho tệp theo định dạng objectname + số thứ tự
            new_file_name = f'{object_name}_{counter}{file_extension}'

            # Đường dẫn đầy đủ đến tệp gốc và tệp đích
            source_file = os.path.join(source_folder, file_name)
            destination_file = os.path.join(destination_folder, new_file_name)

            try:
                # Sao chép và đổi tên tệp
                shutil.copy2(source_file, destination_file)
                print(f'Đã sao chép {file_name} thành {new_file_name}')
                # Tăng số thứ tự
                counter += 1
            except Exception as e:
                print(f'Không thể sao chép {file_name}: {e}')

print('Hoàn tất việc đổi tên và sao chép các hình ảnh.')
