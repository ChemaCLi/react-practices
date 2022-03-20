export const ContentContainer = ({ children }) => {
  return (
    <div style={{
      width: "70%",
      margin: "2rem auto",
      display: "flex",
      flexDirection: "column",
      gap: 50
    }}>
      {children}
    </div>
  )
}