-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ServiceImage" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "ServiceImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basic" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "Basic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Standard" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "Standard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Premium" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "packageId" TEXT NOT NULL,

    CONSTRAINT "Premium_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Package" (
    "id" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,

    CONSTRAINT "Package_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "serviceId" TEXT NOT NULL,
    "comments" TEXT NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BannerImage" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "BannerImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortfolioImage" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,

    CONSTRAINT "PortfolioImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Service_ownerId_key" ON "Service"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Basic_packageId_key" ON "Basic"("packageId");

-- CreateIndex
CREATE UNIQUE INDEX "Standard_packageId_key" ON "Standard"("packageId");

-- CreateIndex
CREATE UNIQUE INDEX "Premium_packageId_key" ON "Premium"("packageId");

-- CreateIndex
CREATE UNIQUE INDEX "Package_serviceId_key" ON "Package"("serviceId");

-- AddForeignKey
ALTER TABLE "ServiceImage" ADD CONSTRAINT "ServiceImage_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service" ADD CONSTRAINT "Service_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basic" ADD CONSTRAINT "Basic_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Standard" ADD CONSTRAINT "Standard_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Premium" ADD CONSTRAINT "Premium_packageId_fkey" FOREIGN KEY ("packageId") REFERENCES "Package"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Package" ADD CONSTRAINT "Package_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
