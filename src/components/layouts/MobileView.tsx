interface MobileViewProps {
  children: React.ReactNode
}

export default function MobileView({ children }: MobileViewProps) {
  return (
    <div className="screen">
      <div className="app-container">{children}</div>
    </div>
  )
}
