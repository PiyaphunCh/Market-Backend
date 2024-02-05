export interface optionItem {
  option0Text: string
  option1Text: string
  option2Text: string
  option3Text: string
  option4Text: string
}

export interface nftitem {
  nameEnglish: string
  refine: string
  nameid: string
  option0Text: string
  option1Text: string
  option2Text: string
  option3Text: string
  option4Text: string
}

export interface itemOrigin {
  nft: nftitem
  price: string
  nameid: string
  id: string
}

export interface itemNew {
  name: string
  price: number
  refine: string
  img: string
  link: string
  enchants: optionItem
}
