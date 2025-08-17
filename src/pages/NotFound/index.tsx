import { Search } from 'lucide-react'

export const NotFound = () => {
    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-2xl mx-auto text-center space-y-8">
                <div className="relative">
                    <h1 className="text-9xl font-bold text-primary/20 select-none animate-pulse">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-24 h-24 rounded-full bg-accent/10 animate-bounce flex items-center justify-center">
                            <Search className="w-12 h-12 text-accent animate-spin" style={{ animationDuration: '3s' }} />
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <h2 className="text-4xl font-bold text-foreground">
                        Ups! Səhifə tapılmadı
                    </h2>
                    <p className="text-lg text-muted-foreground max-w-md mx-auto">
                        Axtardığınız səhifə mövcud deyil.
                    </p>
                </div>
            </div>
        </div>
    )
}