import { AudioLines, CassetteTape, Disc3, Droplet, Footprints, Gem, Lock, Mic2, Shirt } from "lucide-react"

const ICONS = {
    audioLines: AudioLines,
    cassette: CassetteTape,
    disc: Disc3,
    droplet: Droplet,
    footprints: Footprints,
    gem: Gem,
    lock: Lock,
    mic: Mic2,
    shirt: Shirt,
}

const ProductIcon = ({ name, className }) => {
    const Icon = ICONS[name] || AudioLines
    return <Icon className={className} />
}

export default ProductIcon
