import React, { useContext, useEffect, useState } from "react"
import { useParams, useNavigate, useSearchParams } from "react-router-dom"
import { useForm, useFieldArray } from "react-hook-form"
import axios, { AxiosResponse, AxiosError } from "axios"
import { toast } from 'react-toastify'
import { AuthContext } from "@/context/AuthContext"
import { templates } from "@/resources/mock/templates"
import type { ProductData } from "@/types/products"

// 주문 받는 사람 타입
type Receiver = { name: string; phone: string; quantity: number }
// Form 기본값
type FormValues = { sender: string; receivers: Receiver[] }
const MAX_RECEIVERS = 10
const DEFAULT_RECEIVER: Receiver = { name: "", phone: "", quantity: 1 }


// OrderPage 컴포넌트
export default function OrderPage() {
  const params = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, token } = useContext(AuthContext)!
  const userName = user?.name || ""

  // 로그인 체크
  useEffect(() => {
    if (!token) {
      const redirectTo = `${location.pathname}${location.search}`
      navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`, { replace: true })
    }
  }, [token, navigate])
  if (!token || !user) return null

  // React Hook Form 설정 (sender 기본값에 user.name 사용)

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<FormValues>({
    defaultValues: { sender: userName, receivers: [DEFAULT_RECEIVER] },
    mode: "onChange",
  })

  const receivers = watch("receivers")
  const { fields, append, remove } = useFieldArray({ control, name: "receivers" })

  // 템플릿 상태
  const initialTemplateId = Number(searchParams.get("template")) || templates[0].id
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>(initialTemplateId)
  const selectedTemplate =
    templates.find((t) => t.id === selectedTemplateId) || templates[0]
  const [messageText, setMessageText] = useState(selectedTemplate.defaultTextMessage)

  useEffect(() => {
    setMessageText(selectedTemplate.defaultTextMessage)
  }, [selectedTemplateId])

  // 상품 조회
  const idParam = params.id
  const productId = Number(idParam)
  const [productSummary, setProductSummary] = useState<ProductData | null>(null)
  const [loadingProduct, setLoadingProduct] = useState(true)
  const [errorProduct, setErrorProduct] = useState(false)

  useEffect(() => {
    setLoadingProduct(true)
    setErrorProduct(false)
    axios
      .get<{ data: ProductData }>(
        `http://127.0.0.1:3000/api/products/${productId}/summary`,
      )
      .then((res: AxiosResponse<{ data: ProductData }>) => {
        setProductSummary(res.data.data)
        setLoadingProduct(false)
      })
      .catch((err: AxiosError) => {
        console.error("상품 조회 실패:", err)
        setErrorProduct(true)
        setLoadingProduct(false)
        const errorMessage =
          (err.response &&
            typeof err.response.data === "object" &&
            err.response.data &&
            "data" in err.response.data &&
            typeof (err.response.data as any).data === "object" &&
            (err.response.data as any).data &&
            "message" in (err.response.data as any).data)
            ? (err.response.data as any).data.message
            : "제품 정보를 불러오지 못했습니다."
        toast.error(errorMessage)
       navigate("/", { replace: true })
      })
  }, [productId])

  if (loadingProduct) {
    return <div>상품 정보를 로딩 중…</div>
  }
  if (errorProduct || !productSummary) {
    return <div>상품 정보를 가져올 수 없습니다. (ID: {productId})</div>
  }

// OrderPage.tsx (onSubmit 부분)
const onSubmit = async (data: FormValues) => {
  try {
    await axios.post(
      "http://127.0.0.1:3000/api/order",        // 1) URL 수정
      {
        productId: Number(params.id),           // 2) URL 파라미터나 state에서 가져오기
        message: messageText,
        messageCardId: String(selectedTemplateId),      // 3) templateId → messageCardId
        ordererName: data.sender,               // 4) sender → ordererName
        receivers: data.receivers.map(r => ({   // 5) phone → phoneNumber
          name: r.name,
          phoneNumber: r.phone,
          quantity: r.quantity,
        })),
      },
      {
        headers: {
          Authorization:token,
        },
      }
    );

    alert("주문이 완료되었습니다!");
    navigate("/", { replace: true });
  } catch (err: any) {
   const status = err.response?.status;
   if (status === 401) {
     // 현재 URL 을 redirect 파라미터로 넘기기
     const redirectTo = location.pathname + location.search;
     navigate(
       `/login?redirect=${encodeURIComponent(redirectTo)}`,
       { replace: true }
     );
     return;
   }
   // 그 외 에러는 기존처럼 alert
   console.error("주문 에러 응답:", err.response?.data);
   alert(
     err.response?.data?.message ||
     `서버 에러: ${status}`
   );
  }
};


  // 스타일 (간단하게 인라인 유지)
  const templateListStyle: React.CSSProperties = {
    display: "flex",
    overflowX: "auto",
    gap: 8,
    padding: "8px 0",
  };

  return (
    <div style={{ padding: 20 }}>
      {/* 템플릿 리스트 */}
      <div style={templateListStyle}>
        {templates.map((t) => (
          <img
            key={t.id}
            src={t.thumbUrl}
            alt={t.defaultTextMessage}
            onClick={() => setSelectedTemplateId(t.id)}
            style={{
              width: 80,
              height: 80,
              objectFit: "cover",
              cursor: "pointer",
              border: selectedTemplateId === t.id ? "2px solid #467DE9" : "2px solid transparent",
              borderRadius: 4,
            }}
          />
        ))}
      </div>

      {/* 선택된 템플릿 미리보기 & 메시지 */}
      <img
        src={selectedTemplate.imageUrl}
        alt="선택된 템플릿 메시지 카드 미리보기"
        style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
      />
      <label style={{ display: "block", marginBottom: 8 }}>메시지 내용:</label>
      <textarea
        value={messageText}
        onChange={(e) => setMessageText(e.target.value)}
        rows={3}
        style={{ width: "100%", padding: 8, border: "1px solid #ccc", borderRadius: 4 }}
      />

      {/* 주문 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 24 }}>
        {/* 보내는 사람 */}
        <div style={{ marginBottom: 16 }}>
          <label>보내는 사람</label>
          <input
            {...register("sender", { required: "보내는 사람 이름을 입력하세요." })}
            defaultValue={userName}
            className="w-full p-2 border rounded"
          />
          {errors.sender && <p className="text-red-500 text-sm">{errors.sender.message}</p>}
        </div>

        {/* 받는 사람 리스트 */}
        <h2>받는 사람</h2>
        <p>* 최대 {MAX_RECEIVERS}명까지 추가할 수 있어요.</p>
        <p>* 전화번호 중복 입력 불가.</p>
        <button
          type="button"
          onClick={() => {
            if (fields.length < MAX_RECEIVERS) append(DEFAULT_RECEIVER)
            trigger()
          }}
          style={{
            marginBottom: 16,
            padding: "4px 12px",
            backgroundColor: "#f3f4f6",
            borderRadius: 4,
            border: "none",
            cursor: "pointer",
          }}
        >
          추가하기
        </button>

        {fields.map((field, idx) => (
          <div key={field.id} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h3>받는 사람 {idx + 1}</h3>
              <button
                type="button"
                onClick={() => remove(idx)}
                className="text-red-500"
              >
                ✕
              </button>
            </div>

            {/* 이름 */}
            <div className="mb-2">
              <label>이름</label>
              <input
                {...register(`receivers.${idx}.name`, { required: "이름을 입력하세요." })}
                className="w-full p-2 border rounded"
              />
              {errors.receivers?.[idx]?.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receivers[idx]?.name?.message}
                </p>
              )}
            </div>

            {/* 전화번호 */}
            <div className="mb-2">
              <label>전화번호</label>
              <input
                {...register(`receivers.${idx}.phone`, {
                  required: "전화번호를 입력하세요.",
                  pattern: {
                    value: /^010\d{8}$/,
                    message: "01012345678 형식이어야 해요.",
                  },
                  validate: (val) => {
                    const count = receivers.filter((r) => r.phone === val).length
                    return count === 1 || "중복된 전화번호가 있습니다."
                  },
                })}
                className="w-full p-2 border rounded"
              />
              {errors.receivers?.[idx]?.phone && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receivers[idx]?.phone?.message}
                </p>
              )}
            </div>

            {/* 수량 */}
            <div className="mb-2">
              <label>수량</label>
              <input
                type="number"
                {...register(`receivers.${idx}.quantity`, {
                  min: { value: 1, message: "1개 이상 입력하세요." },
                })}
                className="w-full p-2 border rounded"
                min={1}
              />
              {errors.receivers?.[idx]?.quantity && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.receivers[idx]?.quantity?.message}
                </p>
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="px-4 py-2 bg-yellow-400 rounded w-full"
        >
          {fields.length}명 완료
        </button>
      </form>

      {/* 상품 정보 */}
      <div style={{ marginTop: 32 }}>
        <img
          src={productSummary.imageURL}
          alt={productSummary.name}
          style={{ width: 80, borderRadius: 8 }}
        />
        <div>{productSummary.name}</div>
        <p>₩{productSummary.price.sellingPrice?.toLocaleString()}</p>
      </div>
    </div>
  )
}