import { Separator } from "@radix-ui/react-dropdown-menu"
import { DialogContent } from "../ui/dialog"
import { Label } from "../ui/label"

function ShoppingOrderDetails(){
    return(
        <DialogContent className="sm:max-w-[600px]">
        <div className="grid gap-6">
            <div className="grid gap-2">
                <div className="flex mt-6 items-center justify-between">
                    <p className="font-medium">Order ID</p>
                    <Label>123</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Order Date</p>
                    <Label>Date</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Order Price</p>
                    <Label>$1000</Label>
                </div>
                <div className="flex mt-2 items-center justify-between">
                    <p className="font-medium">Order Status</p>
                    <Label>Complete</Label>
                </div>
            </div>
            <Separator />
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <div className="font-medium">Order Details</div>
                    <ul className="grid gap-3">
                        <li className="flex items-center justify-between">
                            <span>Title: Product One</span>
                            <span>Price: $100</span>
                        </li>   
                    </ul>
                </div>
            </div>

            <div className="grid gap-4">
                <div className="grid gap-2">
                    <div className="font-medium">
                        Address Info
                    </div>
                    <div className="grid gap-0.5 text-muted-foreground">
                        <span>Aviana Phoenix</span>
                        <span>Nepal</span>
                        <span>Lazimpat</span>
                        <span>4111</span>
                        <span>2346758</span>
                        <span>yes</span>
                    </div>
                </div>
            </div>
            
        </div>
    </DialogContent>
    )
}

export default ShoppingOrderDetails