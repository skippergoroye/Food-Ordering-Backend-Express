import express, { Request, Response, NextFunction } from "express";
import { FoodDoc, Vendor } from "../models";

export const GetFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;

  const result = await Vendor.find({
    pincode: pincode,
    serviceAvailable: false,
  })
    .sort([["rating", "descending"]])
    .populate("foods");

  if (result && result.length > 0) {
    res.status(200).json(result);
  }

  return res.status(400).json({ message: "No restaurant available!" });
};

export const GetTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;

  const result = await Vendor.find({
    pincode: pincode,
    serviceAvailable: false,
  })
    .sort([["rating", "descending"]])
    .limit(10);

  if (result && result.length > 0) {
    res.status(200).json(result);
  }

  return res.status(400).json({ message: "No restaurant available!" });
};

export const GetFoodsIn30Min = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pincode;

  const result = await Vendor.find({
    pincode: pincode,
    serviceAvailable: false,
  }).populate("foods");

  if (result && result.length > 0) {
    let foodResult: any = [];

    result.map((vendor) => {
      const foods = vendor.foods as [FoodDoc];

      foodResult.push(...foods.filter((food) => food.readyTime < 30));
    });

    return res.status(200).json(foodResult);
  }

  return res.status(400).json({ message: "No restaurant available!" });
};

export const SearchFoods = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const RestaurantById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
    const id = req.params.id;
    
    const result = await Vendor.findById(id).populate('foods')
    
    if(result){
        return res.status(200).json(result);
    }

    return res.status(404).json({ msg: 'data Not found!'});
};

export const GetAvailableOffers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
