import PresentWho from "@/components/PresentWho"
import PresentLayout from "@/components/PresentLayout"
import Text from "@/components/Text"
import PlusNewPerson from "./PlusNewPerson"
import PresentCardStyle from "@/components/PresentCardStyle"
import { useContext } from "react"
import { PresentThemeContext } from "@/context/PresentThemeContext"
import Layout from "@/components/Layout"
import Blank from "@/components/Blank"
import Column from "@/components/Column"
import Trending from "./Trending"
import { useState, useEffect } from "react"
import axios from "axios"
interface PresentItem {
  themeId: number
  name: string
  image: string
}
interface PresentCardProps {
  present: PresentItem
}

const PresentCard = ({ present }: PresentCardProps) => {
  return (
    <PresentCardStyle>
      <img src={present.image} alt="" />
      <Text variant="label2Regular" margin="spacing2" padding="spacing2">
        {present.name}
      </Text>
    </PresentCardStyle>
  )
}

const PresentList = () => {
  const [presents, setPresents] = useState<PresentItem[] | null>(null)
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setLoading(true)
      try {
        console.log("fetchData start")
        const response = await axios.get<PresentItem[]>(
          "http://localhost:3000/api/themes"
        )
        console.log(response)
        setPresents(response.data.data)
      } catch (e) {
        console.log(e)
      }
      setLoading(false)
    }
    fetchData()
  }, [])

  if (loading) {
    return <div>대기 중...</div>
  }

  if (!presents) {
    return <div>hi</div>
  }

  return (
    <PresentLayout>
      {presents.map(function (Present) {
        return <PresentCard key={Present.themeId} present={Present} />
      })}
    </PresentLayout>
  )
}

const Categories = () => {
  return (
    <Layout>
      <PlusNewPerson />

      <Layout>
        <Blank height="24px" />
        <Text variant="title1Bold" margin="spacing2" padding="spacing2">
          선물 테마
        </Text>

        <PresentList />
        <Layout>
          <PresentWho
            color="kakaoYellow"
            padding="spacing0"
            margin="spacing4"
            border="spacing3"
          >
            <Column>
              <Text
                variant="label2Regular"
                margin="spacing4"
                marginLeft="spacing0"
                padding="spacing0"
                marginBottom="spacing0"
              >
                카카오테크 캠퍼스 3기여러분
              </Text>
              <Text
                variant="label1Bold"
                margin="spacing4"
                padding="spacing0"
                marginTop="spacing0"
              >
                프론트엔드 2단계 과제 화이팅! 🎉
              </Text>
            </Column>
          </PresentWho>
          <Blank height="24px" />
          <Trending />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default Categories
