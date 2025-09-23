import OrderSidebar from "@/components/order/OrderSidebar";
import OrderSummary from "@/components/order/OrderSummary";
import ToastNotification from "@/components/ui/ToastNotification";


export default function RootLayout({ children }: Readonly<{children: React.ReactNode;}>) {
    return (

        <>
            <div className="md:flex">
                <OrderSidebar/>
                
                <main className="md:flex-1 md:h-screen md:overflow-y-scroll p-5"> {/** ocupa todo el alto disponible y fija el scroll  */}
                    {children}          {/** inyecta la vista page al layout */}
                </main>

                <OrderSummary/>
            </div>
            <ToastNotification/>
        </>
    )
  }