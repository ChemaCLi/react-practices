export const ContentContainer = ({ children }) => {
  return (
    <div style={{
      maxWidth: "700px",
      margin: "2rem auto",
      display: "flex",
      flexDirection: "column",
      gap: 50,
      padding: "0.5rem"
    }}>
      {children}
    </div>
  )
}