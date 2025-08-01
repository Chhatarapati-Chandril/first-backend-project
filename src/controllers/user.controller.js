import { asyncHandler } from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js"



const registerUser = asyncHandler( async (req, res) => {

    // console.log("MULTER DEBUG:");
    // console.log("Content-Type:", req.headers["content-type"]);
    // console.log("req.files:", req.files);
    // console.log("req.body:", req.body);

        // get user details
        // validation - not empty
        // check if user already exists: username, email
        // check for images, check for avatar
        // upload them to cloudinary, avatar
        // create user object - create entry in db
        // remove password and refresh token field from response
        // check for user creation
        // return res


        const {fullName, email, username, password} = req.body
        console.log("email: ", email)

        if(
            [fullName, email, username, password].some((field) => field?.trim() === "")
        ){
            throw new ApiError(400, "All fields are required")
            
        }

        const existedUser = await User.findOne(
            {
                $or: [{username}, {email}]
            }
        )
        if (existedUser) {
            throw new ApiError(409, "User with email or username already exists")
        }
        console.log(req.files);
        

        const avatarLocalPath = req?.files?.avatar?.[0]?.path
        const coverImageLocalPath = req?.files?.coverImage?.[0]?.path

        if (!avatarLocalPath) {
            throw new ApiError(400, "Avatar file is required")
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath)
        const coverImage = await uploadOnCloudinary(coverImageLocalPath)

        if (!avatar || !avatar.url) {
            throw new ApiError(500, "Avatar upload failed");
        }

        const user = await User.create(
            {
                fullName,
                avatar: avatar.url,
                coverImage: coverImage?.url || "",
                email,
                password,
                username: username.toLowerCase()
            }
        )

        const createdUser = await User.findById(user._id).select("-password -refreshToken")
        if (!createdUser) {
            throw new ApiError(500, "Something went wrong while registering the user")
        }

        return res.status(201).json(
            new ApiResponse(201, createdUser, "User registered successfully")
        )




    }
)


export {registerUser}