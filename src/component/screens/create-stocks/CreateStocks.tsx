import Layout from "@/component/layout/Layout"
import axios from "axios"
import { IStockData } from "@/interface/stock.interface"
import { FC, MouseEvent, useState } from "react"
import Stock from "../home/stocks/Stock"
import style from "./CreateStocks.module.scss"

const CreateStocks: FC<IStockData> = ({ stocksAll, dataCard }) => {
  // console.log(dataCard)
  // Состояния для хранения данных формы
  const [stock, setStocks] = useState(stocksAll) // Состояние для хранения всех новостей
  const [title, setTitle] = useState("") // Состояние для хранения заголовка новости
  const [description, setDescription] = useState("") // Состояние для хранения описания новости
  const [image, setImage] = useState<File | null>(null) // Состояние для хранения выбранного изображения

  const [previewImage, setPreviewImage] = useState(null)

  // ==================================
  // ====> вывод превью картинки <=====
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader() // Создаем новый экземпляр объекта FileReader
      reader.onloadend = () => {
        setPreviewImage(reader.result) // Устанавливаем результат чтения файла в переменную previewImage
      }
      reader.readAsDataURL(file) // Читаем содержимое файла и преобразуем его в Data URL
    }
  }
  // ==================================
  // ==================================

  // Обработчик события при нажатии на кнопку "создать статью"
  const createStocks = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    try {
      // Создание нового объекта FormData
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("short_description", "-")
      formData.append("image", image as File)
      const formDataObject = {}
      for (const [key, value] of formData.entries()) {
        formDataObject[key] = value
      }
      // console.log(formDataObject)
      // console.log(formDataObject.image == "null")
      formData.append("image", `${formDataObject.image.name}`)

      // Отправка данных на сервер с помощью axios
      if (formDataObject.image == "null") {
        await axios.post(`http://${process.env.HOST}/Stocks/CreateStocks/noImg`, formDataObject) // отправка данных
      } else {
        await axios.post(`http://${process.env.HOST}/Stocks/CreateStocks`, formData) // отправка данных
      }
      // Обновление состояния новостей после успешной отправки
      setStocks([...stock, { id: stock.length + 1, title, description, image: `${formDataObject.image.name}` }])

      setTitle("")
      setDescription("")
      setImage(null)
      setPreviewImage(null)
    } catch (error) {
      console.error(error)
    }
  }

  // ===========================================
  // ===========================================

  return (
    <Layout title={"create"}>
      <div style={{ paddingTop: "130px" }}></div>

      <form className={style.form}>
        <div className={style.card_create_wrap}>
          <div className={style.offer}>
            <div className={style.img_for_offer} style={{ backgroundImage: `url(${previewImage})` }}></div>
            <div className={style.info_block}>
              <div className={style.title_offer}>
                {/* <textarea className={`${style.input} ${style.title_offer}`} placeholder="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} /> */}
                <div className={`${style.input} ${style.title_offer}`}> {title}</div>
              </div>
              <div className={style.font_for_text}>
                {/* <textarea className={style.input} placeholder="description" value={description} onChange={(e) => setDescription(e.target.value)} /> */}
                <div className={`${style.input} ${style.text}`}> {description} </div>
              </div>
            </div>
          </div>

          {/* ============================== */}
          {/* <div className={style.full_card}> */}
          <div className={`${style.offer} ${style.full_card}`}>
            <div className={style.img_for_offer} style={{ backgroundImage: `url(${previewImage})` }}>
              <input
                type="file"
                placeholder="title"
                accept="image/*"
                onChange={(e) => {
                  setImage(e.target.files?.[0])
                  handleImageChange(e)
                }}
              />
            </div>

            <div className={style.info_block}>
              <div className={style.title_offer}>
                <textarea className={`${style.input} ${style.title_offer}`} placeholder="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className={style.font_for_text}>
                <textarea
                  className={style.input}
                  placeholder="description"
                  value={description}
                  // onKeyDown={handleKeyDown}
                  onChange={(e) => {
                    setDescription(e.target.value)
                  }}
                />
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
        <button onClick={createStocks}>создать статью</button>
      </form>
      <div>==============================</div>

      {/* Отображение списка скидок */}
      <div className={style.card_wrap}>{stock.length ? stock.map((stock) => <Stock key={stock.id} stock={stock} />) : <div>В данный момент акции не проводятся</div>}</div>
    </Layout>
  )
}

export default CreateStocks
