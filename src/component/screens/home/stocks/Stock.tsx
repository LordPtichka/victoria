import { FC, useState } from "react"
import style from "./Stocks.module.scss"
import { IStock, IStockDataSingle } from "@/interface/stock.interface"
import axios from "axios"
import { useRouter } from "next/router"
import React from "react"
import CreateStocks from "../../create-stocks/CreateStocks"

interface block {
  stock: IStock
  handleClickAbout: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleDataUpdate: (event: React.MouseEvent<HTMLButtonElement>) => void
  handleClickDelete: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const Stock: FC<block> = ({ stock, handleClickAbout, handleDataUpdate, handleClickDelete}) => {


  const { pathname } = useRouter() // получаю имя ссылки из useRouter()


  return (
    <>
      <div className={style.offer} onClick={() => pathname !== "/create/stock" ? handleClickAbout(stock) : null}>


        <div className={style.img_for_offer}  style={{ backgroundImage: `url(http://${process.env.HOST}/${stock.imageName})` }}>
          {pathname === "/create/stock" ? (
            <>
              <button onClick={() => handleClickDelete(stock)} className={style.btn_delete}></button>
              <button onClick={() => handleDataUpdate(stock)} className={style.btn_change}>
                Изменить
              </button>
            </>
          ) : (
            ""
          )}
        </div>

        <div className={style.info_block}>
          <div className={style.title_offer}>{stock.title}</div>
          {/* <div className={style.font_for_text}>{stock.description}</div> */}
          <textarea className={style.font_for_text} readOnly={true} value={stock.description ? stock.description : ""} />
        </div>
      </div>
    </>
  )
}

export default Stock
