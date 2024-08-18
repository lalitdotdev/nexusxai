import { Sheet, SheetContent, SheetTrigger } from '../atoms/sheet'

import { BaseComponent } from '@/utils/types'
import { Button } from '../atoms/button'
import { Menu } from 'lucide-react'

export function SimpleSidebar({ children }: BaseComponent) {
    return (
        <div className="sm:hidden">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost">
                        <Menu className="w-5 h-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="left">{children}</SheetContent>
            </Sheet>
        </div>
    )
}
