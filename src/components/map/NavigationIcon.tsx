import React from 'react'

export default function NavigationIcon({ style, fill }: React.SVGProps<SVGSVGElement>) {
    return <svg style={style} fill={fill} width={"100%"} height={"100%"}>
        <path d="M12 2 4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"></path>
    </svg>
}
