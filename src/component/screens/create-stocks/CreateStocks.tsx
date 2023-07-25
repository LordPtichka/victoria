import Layout from "@/component/layout/Layout"
import axios from "axios"
import { IStockData } from "@/interface/stock.interface"
import { FC, MouseEvent, useState } from "react"
import Stock from "../home/stocks/Stock"
import style from "./CreateStocks.module.scss"

const CreateStocks: FC<IStockData> = ({ stocksAll }) => {
  // Состояния для хранения данных формы
  const [stock, setStocks] = useState(stocksAll) // Состояние для хранения всех новостей
  const [title, setTitle] = useState("") // Состояние для хранения заголовка новости
  const [description, setDescription] = useState("") // Состояние для хранения описания новости
  const [img, setImg] = useState("") // Состояние для хранения пути к изображению новости

  // Обработчик события при нажатии на кнопку "создать статью"
  const createStocks = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    // Создание нового объекта новости с данными из формы
    const newStock = {
      id: stock.length + 1,
      title,
      description,
      img,
    }
    // Добавление новой новости в начало массива новостей с помощью функции setStocks

    // Отправка POST-запроса на сервер
    axios

      // .post("http://localhost:4200/stocks", newStock)
      .post("http://localhost:4200/Stocks/CreateStocks", newStock)
      .then((response) => {
        console.log(response.data) // Вывод ответа сервера в консоль
        setStocks((prev) => {
          console.log(prev) // Вывод prev в консоль
          return [newStock, ...prev]
        })

        setTitle("")
        setDescription("")
        setImg("")
      })
      .catch((error) => {
        console.error(error) // Вывод ошибки в консоль
      })
  }




  return (
    <Layout title={"create"}>




      <div>==============================</div>

      <form>
        <div>
          <div className={style.offer}>
            <div className={style.img_for_offer} style={{ backgroundImage: `url()` }}>
              <input type="file" placeholder="title" onChange={(e) => setTitle(e.target.value)} value={title} />
            </div>
            <div className={style.title_offer}>
              <textarea className={`${style.input} ${style.title_offer}`}  placeholder="title" onChange={(e) => setTitle(e.target.value)} value={title} />
            </div>
            <div className={style.font_for_text}>
              <textarea className={style.input}  placeholder="description" onChange={(e) => setDescription(e.target.value)} value={description} />
            </div>
          </div>
        </div>
        <button onClick={createStocks}>создать статью</button>
      </form>

      <div>==============================</div>
      {/* Отображение списка новостей */}
      {stock.length ? stock.map((stock) => <Stock key={stock.id} stock={stock} />) : <div>Stocks Not Found</div>}
    </Layout>
  )
}

export default CreateStocks
