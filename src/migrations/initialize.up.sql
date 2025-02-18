create table if not exists `users`
(
    `id`           int auto_increment primary key,
    `username`     varchar(50),
    `password`     varchar(100),
    `email`        varchar(100),
    `fullname`     varchar(100),
    `address`      text,
    `phone_number` varchar(12),
    `role`         varchar(30),
    `created_at`   timestamp default current_timestamp,
    `updated_at`   timestamp default current_timestamp on update current_timestamp
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci;

create table if not exists `categories`
(
    `id`          int auto_increment primary key,
    `name`        varchar(50),
    `description` text,
    `created_at`  timestamp default current_timestamp,
    `updated_at`  timestamp default current_timestamp on update current_timestamp
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci;

create table if not exists `suppliers`
(
    `id`           int auto_increment primary key,
    `name`         varchar(50),
    `phone_number` varchar(12),
    `email`        varchar(100),
    `address`      text,
    `created_at`   timestamp default current_timestamp,
    `updated_at`   timestamp default current_timestamp on update current_timestamp
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci;

create table if not exists `coupons`
(
    `id`            int auto_increment primary key,
    `name`          varchar(50),
    `discount_rate` double,
    `start_date`    timestamp,
    `end_date`      timestamp,
    `created_at`    timestamp default current_timestamp,
    `updated_at`    timestamp default current_timestamp on update current_timestamp
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci;

create table if not exists `products`
(
    `id`          int auto_increment primary key,
    `name`        varchar(50),
    `image_url`   varchar(255),
    `description` text,
    `price`       int,
    `stock`       int,
    `category_id` int,
    `supplier_id` int,
    `coupon_id`   int,
    `created_at`  timestamp default current_timestamp,
    `updated_at`  timestamp default current_timestamp on update current_timestamp
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci;

create table if not exists `carts`
(
    `id`         int auto_increment primary key,
    `product_id` int,
    `quantity`   int,
    `price`      int,
    `created_at` timestamp default current_timestamp,
    `updated_at` timestamp default current_timestamp on update current_timestamp
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci;

create table if not exists `orders`
(
    `id`          int auto_increment primary key,
    `user_id`     int,
    `payment_id`  int,
    `total_price` int,
    `status`      varchar(30),
    `created_at`  timestamp default current_timestamp,
    `updated_at`  timestamp default current_timestamp on update current_timestamp
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci;

create table if not exists `order_details`
(
    `id`         int auto_increment primary key,
    `order_id`   int,
    `product_id` int,
    `quantity`   int,
    `price`      int,
    `created_at` timestamp default current_timestamp,
    `updated_at` timestamp default current_timestamp on update current_timestamp
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci;

create table if not exists `payments`
(
    `id`   int auto_increment primary key,
    `name` varchar(50)
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci;