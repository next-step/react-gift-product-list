import Text from "../Text"
const ThemeNotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "250px",
        width: "100%",
      }}
    >
      <Text variant="body1Regular" margin="spacing0" padding="spacing0">
        선물테마를 불러올 수 없습니다.
      </Text>
    </div>
  )
}
export default ThemeNotFound
