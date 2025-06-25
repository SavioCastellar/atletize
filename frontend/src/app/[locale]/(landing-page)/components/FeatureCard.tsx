import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"

interface CardItem {
    title: string
    description: string
    icon: LucideIcon
    href: string
}

export const FeatureCard = ({ item }: { item: CardItem }) => {
    const { title, description, icon: Icon, href } = item

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="h-full"
        >
            <Card
                className="group cursor-pointer overflow-hidden relative h-full border-2 border-black transition-colors duration-300"
                onClick={() => window.location.href = href}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-emerald-600/10 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.8 }}
                />
                <CardHeader className="space-y-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Icon className="h-6 w-6 text-emerald-600" />
                    </div>
                    <motion.div
                        initial={{ x: -20 }}
                        animate={{ x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <CardTitle className="text-xl">{title}</CardTitle>
                    </motion.div>
                </CardHeader>
                <CardContent>
                    <motion.p
                        className="text-sm text-gray-600 leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        {description}
                    </motion.p>
                </CardContent>
            </Card>
        </motion.div>
    )
}