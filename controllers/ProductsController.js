import ProductsModel from '../models/Products.js'

// const cloudinary = require('cloudinary').v2;
// import cloudinary from 'cloudinary';
// import multer from 'multer';

// // Конфігуруємо підключення до Cloudinary
// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET
// });

// // Функція, яка зберігає новий продукт в базі даних
// const createProduct = async (req) => {
//     const data = new ProductsModel({
//         title: req.body.title,
//         description: req.body.description,
//         category: req.body.category,
//         price: req.body.price,
//         imageUrl: req.body.imageUrl,
//         language: req.body.language,
//         palette: req.body.palette,
//         year: req.body.year,
//         pageCount: req.body.pageCount,
//         author: req.body.author,
//         publishingHouse: req.body.publishingHouse,
//         rating: req.body.rating,
//         activeRaitingUsers: req.body.activeRaitingUsers,
//         star: req.body.star
//     });
//     const product = await data.save();
//     return product;
// }



// // Функція, яка завантажує зображення до Cloudinary
// const uploadImageToCloudinary = async (imageUrl) => {
//     try {
//         const result = await cloudinary.uploader.upload(imageUrl);
//         console.log(`Зображення успішно завантажено до Cloudinary: ${result.url}`);
//         return result;
//     } catch (error) {
//         console.log(`Помилка завантаження зображення до Cloudinary: ${error.message}`);
//         console.log(`imageUrl ${imageUrl}`);
//         throw error;
//     }
// }

// export const create = async (req, res) => {
//     try {
//         const product = await createProduct(req);

//         // Завантажуємо зображення до Cloudinary
//         const imageResult = await uploadImageToCloudinary(req.body.imageUrl);

//         // Оновлюємо imageUrl на URL завантаженого зображення в Cloudinary
//         product.imageUrl = imageResult.url;

//         // Зберігаємо оновлені дані про продукт в базі даних
//         await product.save();

//         res.json(product);
//     } catch (err) {
//         console.log('err:', err)
//         res.status(500).json({ error: 'Сталася помилка' });
//     }
// }

export const create = async (req, res) => {
    try {
        const data = new ProductsModel({
            title: req.body.title,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            language: req.body.language,
            palette: req.body.palette,
            year: req.body.year,
            pageCount: req.body.pageCount,
            author: req.body.author,
            publishingHouse: req.body.publishingHouse,
            rating: req.body.rating,
            activeRaitingUsers: req.body.activeRaitingUsers,
            star: req.body.star
        })

        const product = await data.save();

        res.json(product)
    } catch (err) {
        console.log('err:', err)
    }
}

export const getAll = async (req, res) => {
    try {
        const product = await ProductsModel.find()

        res.json(product)
    } catch (err) {
        console.log(err)
    }
}
export const remove = async (req, res) => {
    try {
        const productid = req.params.id

        ProductsModel.findByIdAndDelete(
            { _id: productid },
            (err, doc) => {
                if (err) {
                    return res.status(500).join({ message: 'Filed remove post' })
                }
                if (!doc) {
                    return res.status(404).join({ message: 'Post not found' })
                }
                res.json({ sucsses: true })
            }
        )
    } catch (e) {
        console.log(e)
    }
}
export const update = async (req, res) => {
    try {
        const productid = req.params.id

        await ProductsModel.updateOne(
            { _id: productid },
            {
                title: req.body.title,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                language: req.body.language,
                palette: req.body.palette,
                year: req.body.year,
                pageCount: req.body.pageCount,
                author: req.body.author,
                publishingHouse: req.body.publishingHouse,
                rating: req.body.rating,
                activeRaitingUsers: req.body.activeRaitingUsers,
                star: req.body.star
            }
        )
        res.json({ sucsses: true })
    } catch (e) {
        console.log(e)
    }
}
export const getOne = async (req, res) => {
    try {
        const productid = req.params.id;
        ProductsModel.findOne(
            { _id: productid },
            // {$inc:{viewsCount: 1}},
            // {returnDocument: 'after'},
            (err, doc) => {
                if (err) {
                    return res.status(500).json({
                        messege: "Filed to get post"
                    })
                }
                if (!doc) {
                    return res.status(404).json({
                        messege: 'Post not found'
                    })
                }
                res.json(doc)
            }
        )

    } catch (e) {
        console.log(e)
        res.status(500).json({
            messege: "Failed to get posts"
        })
    }
}