import AppKit

struct CelestialAsset {
    let filename: String
    let symbolName: String
    let colors: [NSColor]
}

let sunColor = NSColor(srgbRed: 0.725, green: 0.478, blue: 0.094, alpha: 1)
let moonLight = NSColor(srgbRed: 0.486, green: 0.769, blue: 1, alpha: 1)
let moonShadow = NSColor(srgbRed: 0.071, green: 0.071, blue: 0.122, alpha: 1)

let assets = [
    CelestialAsset(filename: "sun.png", symbolName: "sun.max.fill", colors: [sunColor]),
    CelestialAsset(filename: "moon-new.png", symbolName: "moonphase.new.moon", colors: [moonLight, moonShadow]),
    CelestialAsset(filename: "moon-waxing-crescent.png", symbolName: "moonphase.waxing.crescent", colors: [moonLight, moonShadow]),
    CelestialAsset(filename: "moon-first-quarter.png", symbolName: "moonphase.first.quarter", colors: [moonLight, moonShadow]),
    CelestialAsset(filename: "moon-waxing-gibbous.png", symbolName: "moonphase.waxing.gibbous", colors: [moonLight, moonShadow]),
    CelestialAsset(filename: "moon-full.png", symbolName: "moonphase.full.moon", colors: [moonLight, moonShadow]),
    CelestialAsset(filename: "moon-waning-gibbous.png", symbolName: "moonphase.waning.gibbous", colors: [moonLight, moonShadow]),
    CelestialAsset(filename: "moon-last-quarter.png", symbolName: "moonphase.last.quarter", colors: [moonLight, moonShadow]),
    CelestialAsset(filename: "moon-waning-crescent.png", symbolName: "moonphase.waning.crescent", colors: [moonLight, moonShadow])
]

let outputDirectory = URL(fileURLWithPath: FileManager.default.currentDirectoryPath)
    .appendingPathComponent("projects/WB/celestial", isDirectory: true)

try FileManager.default.createDirectory(
    at: outputDirectory,
    withIntermediateDirectories: true
)

let canvasSize = NSSize(width: 1024, height: 1024)
let symbolConfiguration = NSImage.SymbolConfiguration(pointSize: 720, weight: .regular)

for asset in assets {
    guard let symbol = NSImage(
        systemSymbolName: asset.symbolName,
        accessibilityDescription: nil
    )?.withSymbolConfiguration(symbolConfiguration)?
        .withSymbolConfiguration(.init(paletteColors: asset.colors)) else {
        fatalError("Missing SF Symbol: \(asset.symbolName)")
    }

    guard
        let bitmap = NSBitmapImageRep(
            bitmapDataPlanes: nil,
            pixelsWide: Int(canvasSize.width),
            pixelsHigh: Int(canvasSize.height),
            bitsPerSample: 8,
            samplesPerPixel: 4,
            hasAlpha: true,
            isPlanar: false,
            colorSpaceName: .deviceRGB,
            bytesPerRow: 0,
            bitsPerPixel: 0
        ),
        let context = NSGraphicsContext(bitmapImageRep: bitmap)
    else {
        fatalError("Could not create bitmap for \(asset.filename)")
    }

    NSGraphicsContext.saveGraphicsState()
    NSGraphicsContext.current = context
    NSColor.clear.setFill()
    NSRect(origin: .zero, size: canvasSize).fill()

    let symbolSize = symbol.size
    let scale = min(
        canvasSize.width * 0.82 / symbolSize.width,
        canvasSize.height * 0.82 / symbolSize.height
    )
    let drawSize = NSSize(
        width: symbolSize.width * scale,
        height: symbolSize.height * scale
    )
    let drawRect = NSRect(
        x: (canvasSize.width - drawSize.width) / 2,
        y: (canvasSize.height - drawSize.height) / 2,
        width: drawSize.width,
        height: drawSize.height
    )

    symbol.draw(in: drawRect)
    context.flushGraphics()
    NSGraphicsContext.restoreGraphicsState()

    guard let pngData = bitmap.representation(using: .png, properties: [:]) else {
        fatalError("Could not encode \(asset.filename)")
    }

    try pngData.write(to: outputDirectory.appendingPathComponent(asset.filename))
}
