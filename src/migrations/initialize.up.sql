CREATE TABLE `cart`
(
    `id`         int(11)        NOT NULL,
    `user_id`    int(11)        NOT NULL,
    `product_id` int(11)        NOT NULL,
    `quantity`   int(11)        NOT NULL,
    `price`      decimal(10, 2) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories`
(
    `id`          int(11)     NOT NULL,
    `name`        varchar(50) NOT NULL,
    `description` text        NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `coupons`
--

CREATE TABLE `coupons`
(
    `id`            int(11)       NOT NULL,
    `name`          varchar(50)   NOT NULL,
    `discount_rate` decimal(5, 2) NOT NULL,
    `start_date`    date          NOT NULL,
    `end_date`      date          NOT NULL,
    `product_id`    int(11)       NOT NULL,
    `create_at`     timestamp     NOT NULL DEFAULT current_timestamp(),
    `update_at`     timestamp     NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `orders`
--

CREATE TABLE `orders`
(
    `id`         int(11)                                                         NOT NULL,
    `user_id`    int(11)                                                         NOT NULL,
    `payment_id` int(11)                                                         NOT NULL,
    `status`     enum ('pending','processing','shipped','delivered','cancelled') NOT NULL,
    `create_at`  timestamp                                                       NOT NULL DEFAULT current_timestamp(),
    `update_at`  timestamp                                                       NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `order_details`
--

CREATE TABLE `order_details`
(
    `id`         int(11)        NOT NULL,
    `order_id`   int(11)        NOT NULL,
    `product_id` int(11)        NOT NULL,
    `quantity`   int(11)        NOT NULL,
    `price`      decimal(10, 2) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `payments`
--

CREATE TABLE `payments`
(
    `id`   int(11)     NOT NULL,
    `name` varchar(50) NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products`
(
    `id`          int(11)        NOT NULL,
    `name`        varchar(50)    NOT NULL,
    `image_url`   varchar(255)   NOT NULL,
    `description` text           NOT NULL,
    `price`       decimal(10, 2) NOT NULL,
    `stock`       int(11)        NOT NULL,
    `category_id` int(11)        NOT NULL,
    `supplier_id` int(11)        NOT NULL,
    `create_at`   timestamp      NOT NULL DEFAULT current_timestamp(),
    `update_at`   timestamp      NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `supplier`
--

CREATE TABLE `supplier`
(
    `id`           int(11)      NOT NULL,
    `name`         varchar(50)  NOT NULL,
    `phone_number` varchar(12)  NOT NULL,
    `email`        varchar(100) NOT NULL,
    `address`      text         NOT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users`
(
    `id`           int          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `username`     varchar(50)  NOT NULL,
    `password`     varchar(255) NOT NULL,
    `email`        varchar(100) NOT NULL,
    `full_name`    varchar(100),
    `address`      text,
    `phone_number` varchar(12),
    `role`         varchar(50),
    `create_at`    timestamp    NOT NULL DEFAULT current_timestamp(),
    `update_at`    timestamp    NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `cart`
    ADD PRIMARY KEY (`id`),
    ADD KEY `product_id` (`product_id`),
    ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
    ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `coupons`
--
ALTER TABLE `coupons`
    ADD PRIMARY KEY (`id`),
    ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `orders`
--
ALTER TABLE `orders`
    ADD PRIMARY KEY (`id`),
    ADD KEY `user_id` (`user_id`),
    ADD KEY `payment_id` (`payment_id`);

--
-- Chỉ mục cho bảng `order_details`
--
ALTER TABLE `order_details`
    ADD PRIMARY KEY (`id`),
    ADD KEY `order_id` (`order_id`),
    ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `payments`
--
ALTER TABLE `payments`
    ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
    ADD PRIMARY KEY (`id`),
    ADD KEY `category_id` (`category_id`),
    ADD KEY `supplier_id` (`supplier_id`);

--
-- Chỉ mục cho bảng `supplier`
--
ALTER TABLE `supplier`
    ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
    ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `cart`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `coupons`
--
ALTER TABLE `coupons`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `supplier`
--
ALTER TABLE `supplier`
    MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `cart`
    ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Các ràng buộc cho bảng `coupons`
--
ALTER TABLE `coupons`
    ADD CONSTRAINT `coupons_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `orders`
--
ALTER TABLE `orders`
    ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`);

--
-- Các ràng buộc cho bảng `order_details`
--
ALTER TABLE `order_details`
    ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`),
    ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
    ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
    ADD CONSTRAINT `products_ibfk_2` FOREIGN KEY (`supplier_id`) REFERENCES `supplier` (`id`);
COMMIT;