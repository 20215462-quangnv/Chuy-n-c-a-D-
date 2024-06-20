function generatePostcard(userName, gender) {
  const canvas = document.getElementById("postcardCanvas");
  if (!canvas) {
    console.error("Không thể tìm thấy phần tử canvas!");
    return;
  }
  const ctx = canvas.getContext("2d");
  const img = new Image();
  img.crossOrigin = "anonymous";

  // Đường dẫn tới hình ảnh postcard từ đường dẫn tương đối
  const postcardImageSrc = "image_source/Postcard.png"; // Đường dẫn tới hình ảnh postcard

  // Vị trí của text trong postcard
  const positionY = canvas.height * 0.7; // Đặt ở 75% chiều cao của canvas
  const positionX = 30; // Cách bên trái 25px
  const rightEdgeX = canvas.width - 27; // Cách viền phải của canvas 25px

  // Mảng chứa tiền tố, câu chúc và hậu tố
  const prefixes = [
    "Đội ngũ Chuyện của Dó",
    "Chuyện của Dó",
    "Chúng tớ",
    "Bọn mình",
    "Chúng mình",
    "Đội ngũ của chúng mình",
    "Nhóm của chúng tớ",
    "Nhóm chúng mình",
    "Tất cả chúng mình ở Chuyện của Dó",
  ];

  const fixedMessage = [
    " Chúc bạn luôn mạnh khỏe, hạnh phúc.",
    " Chúc bạn luôn vui vẻ và có thật nhiều năng lượng.",
    " Chúc bạn luôn tràn đầy hạnh phúc.",
    " Mong rằng thật nhiều tình yêu sẽ đến với bạn.",
    " Chúc bạn thành công trong mọi lĩnh vực mà mình theo đuổi. ",
  ];

  const suffixes = [
    " Hãy tiếp tục đồng hành cùng chúng mình trên hành trình bảo tồn và phát triển giá trị của dân tộc.",
    " Cùng nhau chung tay tạo ra giá trị đáng quý cho nét đẹp văn hóa truyền thống nhé.",
    " Hãy tiếp tục giữ vững tinh thần học hỏi, sáng tạo và chia sẻ để cùng nhau tạo nên những giá trị tốt đẹp cho cộng đồng nhé.",
    " Hy vọng bạn sẽ tiếp tục gắn bó và đồng hành cùng chúng mình trong tương lai.",
    " Mong rằng bạn sẽ luôn duy trì sự nhiệt huyết và tình yêu dành cho văn hóa dân tộc.",
    " Chúng mình rất mong đợi những đóng góp và chia sẻ tiếp theo từ bạn.",
    " Hy vọng bạn sẽ tiếp tục tạo ra những giá trị đáng quý cho cộng đồng.",
  ];

  const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
  const message = fixedMessage[Math.floor(Math.random() * fixedMessage.length)];
  const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
  const genderPrefix = gender == 0 ? "chị" : "anh";

  // Tạo một đối tượng FontFace cho font SVN-Dancing-script
  const font = new FontFace(
    "SVN-Dancing-script",
    "url('fonts/SVN-Dancing-script.ttf')"
  );
  font
    .load()
    .then(function (loadedFont) {
      document.fonts.add(loadedFont);
      console.log("Font loaded successfully.");

      img.onload = function () {
        console.log("Image loaded successfully.");

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Vẽ hình ảnh postcard lên canvas
        ctx.font = "17px SVN-Dancing-script"; // Đặt font và kích cỡ chữ

        // Căn giữa văn bản theo chiều dọc
        ctx.textBaseline = "middle";

        // Các phần của văn bản và màu sắc tương ứng
        const textParts = [
          { text: prefix + " ", color: "black" },
          { text: "cảm ơn bạn " },
          { text: userName + ", ", color: "red" },
          {
            text: "đã trở thành một phần của cuộc hành trình này. ",
            color: "black",
          },
          { text: message, color: "black" },
          { text: suffix, color: "black" },
        ];

        // Tính toán chiều rộng tổng thể của văn bản
        let currentX = positionX;
        let currentY = positionY;

        // Hàm để vẽ từng từ và xử lý ngắt dòng
        function drawTextWithLineBreaks(text, color) {
          const words = text.trim().split(/\s+/); // Tách từng từ
          words.forEach(function (word) {
            const wordWidth = ctx.measureText(word).width;
            // Kiểm tra nếu vượt quá chiều rộng của canvas thì xuống dòng
            if (currentX + wordWidth > rightEdgeX) {
              currentY += 25; // Cách nhau 20px giữa các dòng chữ
              currentX = positionX; // Đặt lại x về đầu dòng mới
            }
            // Vẽ từng từ
            ctx.fillStyle = color || "black";
            ctx.fillText(word, currentX, currentY);
            currentX += wordWidth + ctx.measureText(" ").width; // Cộng thêm khoảng cách giữa các từ
          });
        }

        // Vẽ từng phần của văn bản
        textParts.forEach(function (part) {
          drawTextWithLineBreaks(part.text, part.color);
        });

        // Ẩn modal postcard và hiển thị modal kết quả
        $("#postcardModal").modal("hide");
        $("#resultModal #img-result").attr("src", canvas.toDataURL());
        $("#resultModal").modal("show");
      };

      img.src = postcardImageSrc; // Tải hình ảnh postcard
    })
    .catch(function (error) {
      console.error("Font load error:", error);
      img.src = postcardImageSrc; // Trường hợp lỗi, dùng hình ảnh mặc định
    });
}

$(document).ready(function () {
  $("#resultModal").on("hidden.bs.modal", function (event) {
    const canvas = document.getElementById("postcardCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $("#resultModal #img-result").attr("src", "");
  });

  $("#postcardModal").on("hidden.bs.modal", function (event) {
    $("#postcardModal #username").val("");
    $("#postcardModal #count-name").html("0");
    $("#postcardModal .modal-body .sum-character .alert-name").addClass(
      "invisible"
    );
    $("#postcardModal .gender-input").prop("checked", false);
  });

  $("#username").on("keyup", onInputNameChange);
});

function removeDisable() {
  $("#postcardModal .btn-create-postcard").prop("disabled", false);
}

// Xử lý validate và tạo postcard khi người dùng nhấn nút Tạo Postcard
function validateAndGeneratePostcard() {
  const userName = $("#username").val();
  const gender = $("#postcardModal .gender-input:checked").val();

  // Kiểm tra xem người dùng đã nhập tên hay chưa
  if (!userName) {
    // Hiển thị thông báo yêu cầu nhập tên ngay tại giao diện
    $("#postcardModal .modal-body .sum-character .alert-name").removeClass(
      "invisible"
    );
    // Dừng hàm ở đây nếu chưa nhập tên
    return;
  }

  // Người dùng đã nhập tên, tiến hành tạo postcard
  generatePostcard(userName, gender);
}

function onInputNameChange(e) {
  if (e.target.value.length > 0) {
    $("#postcardModal .modal-body .sum-character .alert-name").addClass(
      "invisible"
    );
  }
  $("#postcardModal #count-name").html(e.target.value.length);
}

$(document).ready(function () {
  $("#resultModal").on("hidden.bs.modal", function (event) {
    const canvas = document.getElementById("postcardCanvas");
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    $("#resultModal #img-result").attr("src", "");
  });

  $("#postcardModal").on("hidden.bs.modal", function (event) {
    $("#postcardModal #username").val("");
    $("#postcardModal #count-name").html("0");
    $("#postcardModal .modal-body .sum-character .alert-name").addClass(
      "invisible"
    );
    $("#postcardModal .gender-input").prop("checked", false);
  });

  $("#username").on("keyup", onInputNameChange);
});

function removeDisable() {
  $("#postcardModal .btn-create-postcard").prop("disabled", false);
}

// Xử lý validate và tạo postcard khi người dùng nhấn nút Tạo Postcard
function validateAndGeneratePostcard() {
  const userName = $("#username").val();
  const gender = $("#postcardModal .gender-input:checked").val();

  // Kiểm tra xem người dùng đã nhập tên hay chưa
  if (!userName) {
    // Hiển thị thông báo yêu cầu nhập tên ngay tại giao diện
    $("#postcardModal .modal-body .sum-character .alert-name").removeClass(
      "invisible"
    );
    // Dừng hàm ở đây nếu chưa nhập tên
    return;
  }

  // Người dùng đã nhập tên, tiến hành tạo postcard
  generatePostcard(userName, gender);
}
