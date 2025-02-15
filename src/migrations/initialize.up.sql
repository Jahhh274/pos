create table if not exists `users`
(
    id         int auto_increment primary key,
    username   text unique,
    password   text,
    email      text,
    full_name  text,
    address    text,
    phone      varchar(20),
    created_at timestamp
) engine = InnoDB
  default charset = utf8mb4
  collate = utf8mb4_unicode_ci;

