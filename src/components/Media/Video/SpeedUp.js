import { useMediaQuerySizes } from "../../../hooks/useMediaQuerySizes"

export default function SpeedUp({style, onDblClick}) {
    const {isLG,isMD,isSM,isXS} = useMediaQuerySizes()
    return (
        <div
            style={{
                position: "absolute",
                height: "100%",
                width: isXS||isSM? "20%" : "30%",
                ...style
            }}
            onDoubleClick={onDblClick}
        />
    )
}
