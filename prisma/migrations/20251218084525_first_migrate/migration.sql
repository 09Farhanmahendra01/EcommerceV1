-- CreateEnum
CREATE TYPE "RoleUser" AS ENUM ('superadmin', 'seller', 'customer');

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "user_email" VARCHAR NOT NULL,
    "user_password" VARCHAR NOT NULL,
    "user_type" "RoleUser" NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sellers" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "store_owner_name" VARCHAR NOT NULL,
    "store_name" VARCHAR NOT NULL,
    "store_description" TEXT,
    "store_address" TEXT NOT NULL,
    "store_photo_profile" VARCHAR,
    "store_no_handphone" INTEGER NOT NULL,

    CONSTRAINT "sellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "user_id" UUID NOT NULL,
    "customer_name" VARCHAR NOT NULL,
    "customer_photo_profile" VARCHAR,
    "customer_no_handphone" INTEGER NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "recipient_address" (
    "id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "value" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "recipient_address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_categories" (
    "id" UUID NOT NULL,
    "seller_id" UUID NOT NULL,
    "product_category_name" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" UUID NOT NULL,
    "seller_id" UUID NOT NULL,
    "product_category_id" UUID NOT NULL,
    "product_name" VARCHAR NOT NULL,
    "product_katalog_images" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_variant_status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_variants" (
    "id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "product_variant_name" VARCHAR,
    "product_variant_price" INTEGER NOT NULL,
    "product_variant_stock" INTEGER NOT NULL,
    "product_variant_status" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "product_variants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" UUID NOT NULL,
    "order_number" VARCHAR NOT NULL,
    "customer_id" UUID NOT NULL,
    "seller_id" UUID NOT NULL,
    "product_id" UUID NOT NULL,
    "recipient_address_id" UUID NOT NULL,
    "customer_name" VARCHAR NOT NULL,
    "customer_email" VARCHAR NOT NULL,
    "customer_no_handphone" INTEGER NOT NULL,
    "customer_recipient_address" TEXT NOT NULL,
    "store_name" VARCHAR NOT NULL,
    "store_address" TEXT NOT NULL,
    "store_no_handphone" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" UUID NOT NULL,
    "order_id" UUID NOT NULL,
    "product_name" VARCHAR NOT NULL,
    "product_katalog_images" TEXT NOT NULL,
    "product_description" TEXT NOT NULL,
    "product_category_name" VARCHAR NOT NULL,
    "product_variant_name" VARCHAR,
    "product_variant_price" INTEGER NOT NULL,
    "product_variant_stock" INTEGER NOT NULL,
    "product_variant_status" BOOLEAN NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_email_key" ON "users"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "sellers_user_id_key" ON "sellers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "sellers_store_name_key" ON "sellers"("store_name");

-- CreateIndex
CREATE UNIQUE INDEX "sellers_store_no_handphone_key" ON "sellers"("store_no_handphone");

-- CreateIndex
CREATE UNIQUE INDEX "customers_user_id_key" ON "customers"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "customers_customer_no_handphone_key" ON "customers"("customer_no_handphone");

-- CreateIndex
CREATE UNIQUE INDEX "orders_order_number_key" ON "orders"("order_number");

-- AddForeignKey
ALTER TABLE "sellers" ADD CONSTRAINT "sellers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "customers" ADD CONSTRAINT "customers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipient_address" ADD CONSTRAINT "recipient_address_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_categories" ADD CONSTRAINT "product_categories_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_product_category_id_fkey" FOREIGN KEY ("product_category_id") REFERENCES "product_categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_variants" ADD CONSTRAINT "product_variants_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_seller_id_fkey" FOREIGN KEY ("seller_id") REFERENCES "sellers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_recipient_address_id_fkey" FOREIGN KEY ("recipient_address_id") REFERENCES "recipient_address"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;
