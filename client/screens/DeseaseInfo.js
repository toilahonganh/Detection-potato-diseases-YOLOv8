import React from 'react';
import { Box, Alert, VStack, HStack, Text, Image } from 'native-base';
import { Platform, View, StyleSheet } from 'react-native';

const late__blight = require("../assets/late.png");
const early__blight = require("../assets/early.png");
const nematode = require("../assets/tuyentrung.jpg");
const pest = require("../assets/pest.jpg");

const DiseaseInfo = ({ diseases, urlImage }) => {
  const renderDiseaseInfo = (kind) => {
    switch (kind) {
      case 'Late Blight Potato':
        return (
          <Box mt="150" justifyContent="center" alignContent="center">
            <Box mt="5">
              <Box>
                <Alert w="100%" status="error" colorScheme="info">
                  <VStack space={2} flexShrink={1} w="100%" h="5">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                          Phát hiện bệnh mốc sương trên lá cây khoai tây
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Alert>
                <Image
                  source={{ uri: urlImage }}
                  style={{ width: 380, height: 200, marginTop: 20 }}
                  resizeMode="contain"
                  alt="Uploaded Image"
                />
              </Box>
              <Alert w="96%" status="info" colorScheme="info" mt="5">
                <VStack space={2} flexShrink={1} w="100%" h="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <HStack flexShrink={1} space={2} alignItems="center">
                      <Alert.Icon />
                      <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                        Bệnh mốc sương
                      </Text>
                    </HStack>
                  </HStack>
                  <Box _text={{ color: "coolGray.600" }}>
                    <Text style={styles.descriptionText}>Bệnh mốc sương là một bệnh nhiễm trùng nghiêm trọng ảnh hưởng đến cây khoai tây (và cả cà chua). Được gây ra bởi nấm mốc Phytophthora infestans, bệnh này có thể dẫn đến thiệt hại lớn trong sản xuất khoai tây nếu không được kiểm soát kịp thời.
                    </Text>
                    <Image
                      source={late__blight}
                      style={{ width: 380, height: 200, marginTop: 20, marginBottom: 20 }}
                      resizeMode="contain"
                      alt="Uploaded Image"
                    />
                    <Text style={styles.descriptionTextBold}>1. Nguyên nhân {"\n"}</Text>
                    <Text style={styles.descriptionText}>Phytophthora infestans là một loại nấm mốc thuộc họ Phytophthoraceae. Đây là một loài bệnh ký sinh gây bệnh cho cây trồng thuộc họ Solanaceae, bao gồm khoai tây và cà chua. {"\n"}</Text>
                    <Text style={styles.descriptionTextBold}>2. Triệu Chứng {"\n"}</Text>
                    <Text style={styles.descriptionText}>Lá và thân: Các dấu hiệu đầu tiên thường xuất hiện dưới dạng các đốm nâu hoặc xám trên lá, với viền màu xanh đậm hoặc màu đỏ. Các đốm này có thể nhanh chóng lan rộng và làm cho lá trở nên thối rữa. {"\n"}{"\n"}
                      Nụ và quả: Bệnh cũng có thể ảnh hưởng đến nụ và quả, làm cho chúng bị thối và trở nên không thể sử dụng được. {"\n"}
                    </Text>
                    <Text style={styles.descriptionTextBold}>3. Điều Kiện Phát Triển {"\n"}</Text>
                    <Text style={styles.descriptionText}>Nhiệt độ và độ ẩm: Bệnh mốc sương phát triển mạnh trong điều kiện thời tiết ẩm ướt, mát mẻ. Nấm mốc này cần độ ẩm cao để nảy mầm và lây lan. {"\n"}</Text>
                    <Text style={styles.descriptionText}>Điều kiện môi trường: Các yếu tố như mưa thường xuyên, độ ẩm cao và nhiệt độ thấp đều tạo điều kiện thuận lợi cho sự phát triển của bệnh. {"\n"}</Text>

                    <Text style={styles.descriptionTextBold}>4. Phương Pháp Phòng Ngừa và Kiểm Soát {"\n"}</Text>
                    <Text style={styles.descriptionText}>Sử dụng giống chống bệnh: Lựa chọn giống khoai tây kháng bệnh có thể giúp giảm nguy cơ nhiễm bệnh.{"\n"}</Text>
                    <Text style={styles.descriptionText}>Quản lý nước: Tránh tưới nước quá nhiều và cải thiện hệ thống thoát nước để giảm độ ẩm trong khu vực trồng{"\n"}</Text>
                    <Text style={styles.descriptionText}>Sử dụng thuốc trừ bệnh: Các loại thuốc trừ nấm có thể được sử dụng để kiểm soát sự lây lan của bệnh, nhưng cần phải áp dụng theo chỉ dẫn để tránh sự phát triển của kháng thuốc.{"\n"}</Text>
                    <Text style={styles.descriptionText}>Loại bỏ cây nhiễm bệnh: Kịp thời loại bỏ các cây bị nhiễm bệnh để giảm nguồn bệnh trong khu vực.{"\n"}</Text>
                  </Box>
                </VStack>
              </Alert>
            </Box>
          </Box>
        );
      case 'Early Blight Potato':
        return (
          <Box mt="150" justifyContent="center" alignContent="center">
            <Box mt="5">
              <Box>
                <Alert w="100%" status="error" colorScheme="info">
                  <VStack space={2} flexShrink={1} w="100%" h="5">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                          Phát hiện bệnh đốm vòng trên lá cây khoai tây
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Alert>
                <Image
                  source={{ uri: urlImage }}
                  style={{ width: 380, height: 200, marginTop: 20 }}
                  resizeMode="contain"
                  alt="Uploaded Image"
                />
              </Box>
              <Alert w="96%" status="info" colorScheme="info" mt="5">
                <VStack space={2} flexShrink={1} w="100%" h="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <HStack flexShrink={1} space={2} alignItems="center">
                      <Alert.Icon />
                      <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                        Bệnh đốm vòng
                      </Text>
                    </HStack>
                  </HStack>
                  <Box _text={{ color: "coolGray.600" }}>
                    <Text style={styles.descriptionText}>Bệnh đốm vòng là một bệnh phổ biến gây ảnh hưởng nghiêm trọng đến cây khoai tây và cà chua. Bệnh này được gây ra bởi nấm mốc Alternaria solani.
                    </Text>
                    <Image
                      source={early__blight}
                      style={{ width: 380, height: 200, marginTop: 20, marginBottom: 20 }}
                      resizeMode="contain"
                      alt="Uploaded Image"
                    />
                    <Text style={styles.descriptionTextBold}>1. Nguyên nhân {"\n"}</Text>
                    <Text style={styles.descriptionText}>Alternaria solani là một loại nấm mốc thuộc họ Alternariaceae. Nấm này gây bệnh cho cây trồng thuộc họ Solanaceae, bao gồm khoai tây và cà chua. Nấm phát triển mạnh trong điều kiện thời tiết ấm áp và ẩm ướt. {"\n"}</Text>
                    <Text style={styles.descriptionTextBold}>2. Triệu Chứng {"\n"}</Text>
                    <Text style={styles.descriptionText}>Lá: Các dấu hiệu đầu tiên của bệnh xuất hiện dưới dạng các đốm nâu hoặc đen trên lá. Các đốm này thường có hình tròn hoặc hình bầu dục, với viền vàng xung quanh. Các đốm có thể liên kết lại với nhau, làm cho lá trở nên khô và chết. {"\n"}{"\n"}
                      Thân và Quả: Bệnh cũng có thể ảnh hưởng đến thân cây và quả. Trên thân, các đốm đen có thể xuất hiện và làm cho thân cây bị thối. Trên quả, các đốm này có thể gây ra sự thối rữa và làm giảm chất lượng của quả.. {"\n"}
                    </Text>
                    <Text style={styles.descriptionTextBold}>3. Điều Kiện Phát Triển {"\n"}</Text>
                    <Text style={styles.descriptionText}>Nhiệt Độ và Độ Ẩm: Bệnh đốm vòng phát triển mạnh trong điều kiện thời tiết ấm áp, đặc biệt là khi nhiệt độ từ 20°C đến 25°C và độ ẩm cao. Nấm mốc này cần độ ẩm cao để nảy mầm và lây lan. {"\n"}</Text>
                    <Text style={styles.descriptionText}>Điều Kiện Môi Trường: Mưa thường xuyên và điều kiện ẩm ướt tạo điều kiện thuận lợi cho sự phát triển của bệnh. {"\n"}</Text>

                    <Text style={styles.descriptionTextBold}>4. Phương Pháp Phòng Ngừa và Kiểm Soát {"\n"}</Text>
                    <Text style={styles.descriptionText}>Sử Dụng Giống Chống Bệnh: Lựa chọn giống khoai tây và cà chua kháng bệnh có thể giúp giảm nguy cơ nhiễm bệnh.{"\n"}</Text>
                    <Text style={styles.descriptionText}>Quản lý nước: Tránh tưới nước quá nhiều và cải thiện hệ thống thoát nước để giảm độ ẩm trong khu vực trồng{"\n"}</Text>
                    <Text style={styles.descriptionText}>Sử dụng thuốc trừ bệnh: Các loại thuốc trừ nấm có thể được sử dụng để kiểm soát sự lây lan của bệnh, nhưng cần phải áp dụng theo chỉ dẫn để tránh sự phát triển của kháng thuốc.{"\n"}</Text>
                    <Text style={styles.descriptionText}>Loại bỏ cây nhiễm bệnh: Kịp thời loại bỏ các cây bị nhiễm bệnh để giảm nguồn bệnh trong khu vực.{"\n"}</Text>
                  </Box>
                </VStack>
              </Alert>
            </Box>
          </Box>
        );
      case 'Nematode Potato':
        return (
          <Box mt="150" justifyContent="center" alignContent="center">
            <Box mt="5">
              <Box>
                <Alert w="100%" status="error" colorScheme="info">
                  <VStack space={2} flexShrink={1} w="100%" h="5">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                          Phát hiện bệnh tuyến trùng khoai tây
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Alert>
                <Image
                  source={{ uri: urlImage }}
                  style={{ width: 380, height: 200, marginTop: 20 }}
                  resizeMode="contain"
                  alt="Uploaded Image"
                />
              </Box>
              <Alert w="96%" status="info" colorScheme="info" mt="5">
                <VStack space={2} flexShrink={1} w="100%" h="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <HStack flexShrink={1} space={2} alignItems="center">
                      <Alert.Icon />
                      <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                        Bệnh tuyến trùng
                      </Text>
                    </HStack>
                  </HStack>
                  <Box _text={{ color: "coolGray.600" }}>
                    <Text style={styles.descriptionText}>
                      Bệnh tuyến trùng là bệnh do các loài tuyến trùng ký sinh trong đất gây ra, chủ yếu ảnh hưởng đến rễ cây khoai tây và gây thiệt hại nghiêm trọng.
                    </Text>
                    <Image
                      source={nematode}
                      style={{ width: 380, height: 200, marginTop: 20, marginBottom: 20 }}
                      resizeMode="contain"
                      alt="Uploaded Image"
                    />
                    <Text style={styles.descriptionTextBold}>1. Nguyên nhân {"\n"}</Text>
                    <Text style={styles.descriptionText}>
                      Bệnh gây ra bởi tuyến trùng nang khoai tây (Globodera spp) và tuyến trùng gây bướu rễ (Meloidogyne spp). Chúng sống ký sinh trong đất và tấn công rễ cây, gây khó khăn cho việc hấp thụ nước và dinh dưỡng của cây. {"\n"}
                    </Text>
                    <Text style={styles.descriptionTextBold}>2. Triệu chứng {"\n"}</Text>
                    <Text style={styles.descriptionText}>
                      Rễ: Rễ bị tuyến trùng tấn công có thể xuất hiện các nốt sần, ảnh hưởng đến sự phát triển của cây. {"\n"}
                      Cây: Lá cây khoai tây trở nên vàng và héo úa, cây còi cọc, phát triển kém. {"\n"}
                      Củ: Kích thước củ giảm, biến dạng và năng suất thấp. {"\n"}
                    </Text>
                    <Text style={styles.descriptionTextBold}>3. Điều kiện phát triển {"\n"}</Text>
                    <Text style={styles.descriptionText}>
                      Tuyến trùng phát triển mạnh trong đất có nhiệt độ từ 20°C đến 30°C, đặc biệt trong điều kiện đất nghèo dinh dưỡng và độ ẩm cao. {"\n"}
                    </Text>
                    <Text style={styles.descriptionTextBold}>4. Phương pháp phòng ngừa và kiểm soát {"\n"}</Text>
                    <Text style={styles.descriptionText}>
                      - Luân canh cây trồng: Luân canh với các loại cây không phải ký chủ của tuyến trùng như lúa hoặc ngô.{"\n"}
                      - Sử dụng giống kháng bệnh: Sử dụng các giống khoai tây có khả năng kháng tuyến trùng.{"\n"}
                      - Quản lý đất trồng: Giữ đất tơi xốp, bón phân hữu cơ và đảm bảo hệ thống thoát nước tốt để tránh tình trạng đất quá ẩm.{"\n"}
                      - Thuốc bảo vệ thực vật: Có thể sử dụng các loại thuốc đặc trị tuyến trùng khi cần thiết.{"\n"}
                      - Loại bỏ cây bị nhiễm bệnh: Đào bỏ cây bị nhiễm bệnh và xử lý để tránh lây lan.{"\n"}
                    </Text>
                  </Box>
                </VStack>
              </Alert>
            </Box>
          </Box>
        );
      case 'Healthy Potato':
        return (
          <Box mt="5" justifyContent="center" alignContent="center">
            <Box mb="5">
              <Box>
                <Alert w="100%" status="success" colorScheme="info">
                  <VStack space={2} flexShrink={1} w="100%" h="5">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                          Không phát hiện bệnh trên lá khoai tây
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Alert>
                <Image
                  source={{ uri: urlImage }}
                  style={{ width: 380, height: 200, marginTop: 20 }}
                  resizeMode="contain"
                  alt="Uploaded Image"
                />
              </Box>
            </Box>
          </Box>
        );
      case 'Pest Potato':
        return (
          <Box mt="150" justifyContent="center" alignContent="center">
            <Box mt="5">
              <Box>
                <Alert w="100%" status="error" colorScheme="info">
                  <VStack space={2} flexShrink={1} w="100%" h="5">
                    <HStack
                      flexShrink={1}
                      space={2}
                      alignItems="center"
                      justifyContent="space-between"
                    >
                      <HStack flexShrink={1} space={2} alignItems="center">
                        <Alert.Icon />
                        <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                          Phát hiện bệnh sâu ăn lá trên khoai tây
                        </Text>
                      </HStack>
                    </HStack>
                  </VStack>
                </Alert>
                <Image
                  source={{ uri: urlImage }}
                  style={{ width: 380, height: 200, marginTop: 20 }}
                  resizeMode="contain"
                  alt="Uploaded Image"
                />
              </Box>
              <Alert w="96%" status="info" colorScheme="info" mt="5">
                <VStack space={2} flexShrink={1} w="100%" h="100%">
                  <HStack
                    flexShrink={1}
                    space={2}
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <HStack flexShrink={1} space={2} alignItems="center">
                      <Alert.Icon />
                      <Text fontSize="xs" fontWeight="medium" color="coolGray.800">
                        Bệnh sâu ăn lá
                      </Text>
                    </HStack>
                  </HStack>
                  <Box _text={{ color: "coolGray.600" }}>
                    <Text style={styles.descriptionText}>
                      Bệnh sâu ăn lá thường xuất hiện khi các loài sâu bướm hoặc côn trùng gây hại tấn công, làm giảm diện tích quang hợp và gây thiệt hại nghiêm trọng cho cây trồng.
                    </Text>
                    <Image
                      source={pest}
                      style={{ width: 380, height: 200, marginTop: 20, marginBottom: 20 }}
                      resizeMode="contain"
                      alt="Pest Damage"
                    />
                    <Text style={styles.descriptionTextBold}>1. Nguyên nhân {"\n"}</Text>
                    <Text style={styles.descriptionText}>
                      Các loài sâu như sâu xanh (Spodoptera spp) hoặc sâu đo (Geometridae) tấn công lá khoai tây, gây tổn thương bằng cách cắn và ăn phần lớn bề mặt lá. {"\n"}
                    </Text>
                    <Text style={styles.descriptionTextBold}>2. Triệu chứng {"\n"}</Text>
                    <Text style={styles.descriptionText}>
                      Lá: Xuất hiện các lỗ hoặc mảng lớn trên lá do sâu ăn. Lá có thể bị khô và rụng sớm.{"\n"}
                      Cây: Sự phát triển của cây bị kìm hãm, giảm năng suất do thiếu hụt khả năng quang hợp.{"\n"}
                    </Text>
                    <Text style={styles.descriptionTextBold}>3. Điều kiện phát triển {"\n"}</Text>
                    <Text style={styles.descriptionText}>
                      Sâu ăn lá thường phát triển mạnh trong môi trường ẩm ướt và nhiệt độ ấm, đặc biệt trong các khu vực trồng dày đặc và không có biện pháp kiểm soát côn trùng hiệu quả.{"\n"}
                    </Text>
                    <Text style={styles.descriptionTextBold}>4. Phương pháp phòng ngừa và kiểm soát {"\n"}</Text>
                    <Text style={styles.descriptionText}>
                      - Sử dụng thuốc trừ sâu sinh học hoặc hóa học khi cần thiết để kiểm soát sâu bọ.{"\n"}
                      - Thường xuyên kiểm tra và loại bỏ những lá bị sâu ăn.{"\n"}
                      - Áp dụng phương pháp trồng luân canh để giảm sự phát triển của sâu bệnh.{"\n"}
                      - Sử dụng bẫy hoặc thu hút các loài thiên địch để giảm số lượng sâu gây hại.{"\n"}
                    </Text>
                  </Box>
                </VStack>
              </Alert>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {diseases.map((disease, index) => (
        <React.Fragment key={index}>{renderDiseaseInfo(disease)}</React.Fragment>
      ))}
    </>
  );
};
const styles = StyleSheet.create({
  descriptionText: {
    fontSize: 12,
  },
  descriptionTextBold: {
    fontSize: 14,
    fontWeight: 700
  },
});

export default DiseaseInfo;
