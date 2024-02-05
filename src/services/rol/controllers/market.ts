import axios from 'axios'
import { Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import { itemNew, itemOrigin } from '../interface/rol'
import { itemsModel } from '../models/item.model'

const lineNotify = require('line-notify-nodejs')(
  'KYM0B3NC8LGkjCc7IoMOJbmQynpcSE3rM2MrllBeIn2'
)

export const getRolMarket = async (req: Request, res: Response) => {
  const { type } = req?.body

  if (!type) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'please insert correct type' })
  }
  try {
    let typeUrl: string = ''
    if (type !== 'all') {
      typeUrl = `&category=${type}`
    }

    let newItem: itemNew[] = []

    await axios
      .get(`https://apps.maxion.gg/api/market/list?status=LISTING${typeUrl}`)
      .then(async (resAxios) => {
        newItem = await resAxios?.data.map((item: itemOrigin) => {
          if (parseInt(item?.nft?.refine) >= 7) {
            return {
              name: item?.nft?.nameEnglish,
              price: parseInt(item?.price),
              refine: item?.nft?.refine,
              enchants: {
                option0Text: item?.nft?.option0Text,
                option1Text: item?.nft?.option1Text,
                option2Text: item?.nft?.option2Text,
                option3Text: item?.nft?.option3Text,
                option4Text: item?.nft?.option4Text
              },
              img: `https://apps.maxion.gg/_next/image?url=https%3A%2F%2Fcdn.maxion.gg%2Flandverse%2Fimage%2Fcollection%2F${item?.nft?.nameid}.png&w=256&q=75`,
              link: `https://apps.maxion.gg/roverse/detail/${item?.id}`
            }
          }
        })
        newItem = newItem.filter((item) => {
          return item != null
        })

        let sumPriceAvg = newItem.reduce(
          (accumulator, currentValue) => accumulator + currentValue?.price,
          0
        )
        sumPriceAvg = sumPriceAvg / newItem.length

        const groupedKeys: any = await newItem.reduce(
          async (groupPromise, item) => {
            const group: { [key: string]: itemNew[] } = await groupPromise
            if (!group[item.name]) {
              group[item.name] = []
              const checkItemDuplicate = await itemsModel.findOne({
                name: item.name
              })
              if (!checkItemDuplicate) {
                await itemsModel.create({
                  name: item.name,
                  buyPrice: 0,
                  img: item.img
                })
              }
            }
            group[item.name].push(item)
            return group
          },
          Promise.resolve({})
        )

        const itemsAll = await itemsModel.find()

        Object.keys(groupedKeys).forEach(function (key, index) {
          groupedKeys[key].map(async (item: itemNew) => {
            const itemIsSetBuy = itemsAll.filter((obj) => {
              return obj.name === item.name
            })
            if (item.price <= (itemIsSetBuy[0]?.buyPrice || 0)) {
              let str: string = `\ngame : rol\n`
              str += `item name : ${item.name}\n`
              str += `refine : +${item.refine}\n`
              str += `.............\n`
              str += `enchants\n`
              str += `option 1: ${item.enchants.option0Text}\n`
              str += `option 2: ${item.enchants.option1Text}\n`
              str += `option 3: ${item.enchants.option2Text}\n`
              str += `option 4: ${item.enchants.option3Text}\n`
              str += `option 5: ${item.enchants.option4Text}\n`
              str += `.............\n`
              str += `set price : ${itemIsSetBuy[0].buyPrice}\n`
              str += `price : ${item?.price}\n`
              str += `.............\n`
              str += `link : ${item?.link}\n`

              lineNotify.notify({
                message: str
              })
            }
          })
        })

        return res.status(StatusCodes.OK).json({
          message: 'success',
          count: newItem.length,
          data: newItem,
          groupedKeys: groupedKeys
        })
      })
      .catch(function (error) {
        if (error.response) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json({ message: error.response.data })
        }
      })
  } catch (error) {
    console.error('Error:', error)
  }
}

export const getItemSet = async (req: Request, res: Response) => {
  const { game } = req?.body

  if (!game) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'please insert correct game' })
  }

  const allItems = await itemsModel.find()

  try {
    return res.status(StatusCodes.OK).json({
      message: 'success',
      data: allItems
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

export const updateItemSet = async (req: Request, res: Response) => {
  const { items } = req?.body

  if (!items || items.length === 0) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'please insert correct data' })
  }

  await items.map(async (item: { id: string; buyPrice: number }) => {
    await itemsModel.findOneAndUpdate(
      { _id: item.id },
      { buyPrice: item.buyPrice }
    )
  })

  try {
    return res.status(StatusCodes.OK).json({
      message: 'success'
    })
  } catch (error) {
    console.error('Error:', error)
  }
}

module.exports = {
  getRolMarket,
  getItemSet,
  updateItemSet
}
