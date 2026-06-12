import AppKit

let fileManager = FileManager.default
let root = URL(fileURLWithPath: fileManager.currentDirectoryPath)
let outputDirectory = root.appendingPathComponent("AppIcons")
let canvasSize = NSSize(width: 1024, height: 1024)

struct IconLayer {
    let path: String
    let scale: CGFloat
    let translation: NSPoint
    let alpha: CGFloat
}

struct IconDefinition {
    let outputName: String
    let colors: [NSColor]
    let layers: [IconLayer]
}

func image(at path: String) -> NSImage {
    guard let image = NSImage(contentsOfFile: path) else {
        fatalError("Could not load icon layer at \(path)")
    }
    return image
}

func aspectFitRect(for image: NSImage, scale: CGFloat, translation: NSPoint) -> NSRect {
    let maximumSide = canvasSize.width * scale
    let imageRatio = image.size.width / image.size.height
    var width = maximumSide
    var height = maximumSide

    if imageRatio > 1 {
        height = width / imageRatio
    } else {
        width = height * imageRatio
    }

    return NSRect(
        x: (canvasSize.width - width) / 2 + translation.x,
        y: (canvasSize.height - height) / 2 - translation.y,
        width: width,
        height: height
    )
}

func render(_ definition: IconDefinition) throws {
    let composed = NSImage(size: canvasSize)
    composed.lockFocus()

    guard let context = NSGraphicsContext.current?.cgContext else {
        fatalError("Could not create graphics context")
    }

    let iconRect = NSRect(origin: .zero, size: canvasSize)
    let iconPath = NSBezierPath(roundedRect: iconRect.insetBy(dx: 3, dy: 3), xRadius: 228, yRadius: 228)
    iconPath.addClip()

    let gradient = NSGradient(colors: definition.colors)!
    gradient.draw(in: iconPath, angle: -90)

    let highlight = NSGradient(colors: [
        NSColor.white.withAlphaComponent(0.42),
        NSColor.white.withAlphaComponent(0.03),
        NSColor.black.withAlphaComponent(0.18)
    ])!
    highlight.draw(in: iconPath, angle: -90)

    for layer in definition.layers {
        let layerImage = image(at: layer.path)
        let rect = aspectFitRect(for: layerImage, scale: layer.scale, translation: layer.translation)

        context.saveGState()
        context.setShadow(offset: CGSize(width: 0, height: -16), blur: 28, color: NSColor.black.withAlphaComponent(0.24).cgColor)
        layerImage.draw(in: rect, from: .zero, operation: .sourceOver, fraction: layer.alpha)
        context.restoreGState()

        context.saveGState()
        context.setBlendMode(.screen)
        layerImage.draw(in: rect.offsetBy(dx: 0, dy: 7), from: .zero, operation: .sourceOver, fraction: layer.alpha * 0.25)
        context.restoreGState()
    }

    let border = NSBezierPath(roundedRect: iconRect.insetBy(dx: 8, dy: 8), xRadius: 222, yRadius: 222)
    NSColor.white.withAlphaComponent(0.28).setStroke()
    border.lineWidth = 7
    border.stroke()

    composed.unlockFocus()

    guard
        let tiffData = composed.tiffRepresentation,
        let bitmap = NSBitmapImageRep(data: tiffData),
        let pngData = bitmap.representation(using: .png, properties: [:])
    else {
        fatalError("Could not encode \(definition.outputName)")
    }

    try pngData.write(to: outputDirectory.appendingPathComponent(definition.outputName))
}

let definitions = [
    IconDefinition(
        outputName: "NewsFeeder-current.png",
        colors: [
            NSColor(displayP3Red: 0.652, green: 0.804, blue: 0.983, alpha: 1),
            NSColor(srgbRed: 0.380, green: 0.511, blue: 0.634, alpha: 1)
        ],
        layers: [
            IconLayer(
                path: "../NotiFeeder/NotiFeeder/Icon_LG.icon/Assets/square.fill.text.grid.1x2.png",
                scale: 0.64,
                translation: NSPoint(x: 0, y: 0),
                alpha: 0.84
            )
        ]
    ),
    IconDefinition(
        outputName: "PayScope-current.png",
        colors: [
            NSColor(displayP3Red: 0.42, green: 0.82, blue: 0.43, alpha: 1),
            NSColor(displayP3Red: 0.19, green: 0.48, blue: 0.22, alpha: 1)
        ],
        layers: [
            IconLayer(
                path: "../PayScope/PayScope/gruen.icon/Assets/magnifyingglass.png",
                scale: 0.63,
                translation: NSPoint(x: 72, y: 70),
                alpha: 0.8
            ),
            IconLayer(
                path: "../PayScope/PayScope/gruen.icon/Assets/clock 2.png",
                scale: 0.28,
                translation: NSPoint(x: -170, y: -175),
                alpha: 0.92
            )
        ]
    ),
    IconDefinition(
        outputName: "Wetterblatt-current.png",
        colors: [
            NSColor(displayP3Red: 0.95, green: 0.93, blue: 0.87, alpha: 1),
            NSColor(displayP3Red: 0.82, green: 0.75, blue: 0.60, alpha: 1)
        ],
        layers: [
            IconLayer(
                path: "../Weather App/Weather App/Wetterblatt.icon/Assets/sun.haze.fill.png",
                scale: 0.66,
                translation: NSPoint(x: 0, y: 8),
                alpha: 0.82
            )
        ]
    )
]

for definition in definitions {
    try render(definition)
    print("Rendered \(definition.outputName)")
}
