--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users`
(
    `id`           int          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `username`     varchar(50)  NOT NULL UNIQUE,
    `password`     varchar(255) NOT NULL,
    `email`        varchar(100) NOT NULL,
    `full_name`    varchar(100),
    `address`      text,
    `phone_number` varchar(12),
    `role`         varchar(50),
    `created_at`   timestamp    NOT NULL DEFAULT current_timestamp(),
    `updated_at`   timestamp    NOT NULL DEFAULT current_timestamp()
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

--
-- Cấu trúc bảng cho bảng `supplier`
--

CREATE TABLE `suppliers`
(
    `id`           int          NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name`         varchar(50)  NOT NULL,
    `phone_number` varchar(12)  NOT NULL,
    `email`        varchar(100) NOT NULL,
    `address`      text         NOT NULL,
    `created_at`   timestamp    NOT NULL DEFAULT current_timestamp(),
    `updated_at`   timestamp    NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `deleted_at`   timestamp             DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories`
(
    `id`          int         NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name`        varchar(50) NOT NULL,
    `description` text        NOT NULL,
    `created_at`  timestamp   NOT NULL DEFAULT current_timestamp(),
    `updated_at`  timestamp   NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
    `deleted_at`  timestamp            DEFAULT NULL
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products`
(
    `id`          int            NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name`        varchar(50)    NOT NULL,
    `image_url`   varchar(255)   NOT NULL,
    `description` text           NOT NULL,
    `price`       decimal(10, 2) NOT NULL,
    `stock`       int(11)        NOT NULL,
    `category_id` int(11)        NOT NULL,
    `supplier_id` int(11)        NOT NULL,
    `create_at`   timestamp      NOT NULL DEFAULT current_timestamp(),
    `update_at`   timestamp      NOT NULL DEFAULT current_timestamp(),
    `deleted_at`  timestamp               DEFAULT NULL,
    INDEX         `idx_category_id` (`category_id`),
    INDEX         `idx_supplier_id` (`supplier_id`),
    CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT `fk_products_supplier` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;


--
-- Cấu trúc bảng cho bảng `coupons`
--

CREATE TABLE `coupons`
(
    `id`            int           NOT NULL PRIMARY KEY AUTO_INCREMENT,
    `name`          varchar(50)   NOT NULL,
    `discount_rate` decimal(5, 2) NOT NULL,
    `start_date`    timestamp     NOT NULL,
    `end_date`      timestamp     NOT NULL,
    `product_id`    int(11)       NOT NULL,
    `create_at`     timestamp     NOT NULL DEFAULT current_timestamp(),
    `update_at`     timestamp     NOT NULL DEFAULT current_timestamp(),
    `deleted_at`    timestamp              DEFAULT NULL,
    INDEX           `idx_product_id` (`product_id`),
    CONSTRAINT `fk_coupons_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4
  COLLATE = utf8mb4_general_ci;

--
-- Cấu trúc bảng cho bảng `carts`
--

CREATE TABLE `carts`
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

-- --------------------------------------------------------

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
    `create_at`  timestamp NOT NULL DEFAULT current_timestamp(),
    `update_at`  timestamp NOT NULL DEFAULT current_timestamp()
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

-- --------------------------------------------------------

-- --------------------------------------------------------

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `cart`
--
ALTER TABLE `carts`
    ADD PRIMARY KEY (`id`),
    ADD KEY `product_id` (`product_id`),
    ADD KEY `user_id` (`user_id`);

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
-- AUTO_INCREMENT cho bảng `cart`
--
ALTER TABLE `carts`
    MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `coupons`
--
ALTER TABLE `coupons`
    MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `orders`
--
ALTER TABLE `orders`
    MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `order_details`
--
ALTER TABLE `order_details`
    MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `payments`
--
ALTER TABLE `payments`
    MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
    MODIFY `id` int (11) NOT NULL AUTO_INCREMENT;

--
-- Các ràng buộc cho bảng `cart`
--
ALTER TABLE `carts`
    ADD CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
    ADD CONSTRAINT `cart_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

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