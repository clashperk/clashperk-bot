"""Turns an asset image into a 128x128 Discord emoji. See docs/emojis.md.
uv run --with pillow python scripts/make_emoji.py <source path or URL> <out.webp|out.png>
"""

import io
import sys
import urllib.request

from PIL import Image

SIZE = 128


def load(source: str) -> Image.Image:
    if source.startswith("https://"):
        request = urllib.request.Request(source, headers={"User-Agent": "clashperk-emoji-maker"})
        return Image.open(io.BytesIO(urllib.request.urlopen(request).read()))
    return Image.open(source)


def main(source: str, out: str) -> None:
    image = load(source)
    # Some game icons are animations that open on an effect. The last frame is the finished icon.
    if getattr(image, "is_animated", False):
        image.seek(image.n_frames - 1)
    image = image.convert("RGBA")
    image = image.crop(image.getbbox())
    image.thumbnail((SIZE, SIZE), Image.LANCZOS)

    canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    canvas.paste(image, ((SIZE - image.width) // 2, (SIZE - image.height) // 2), image)

    if out.endswith(".png"):
        canvas.save(out, "PNG", optimize=True)
    elif out.endswith(".webp"):
        # Identical frames get merged into one, so the second differs by one invisible pixel.
        second = canvas.copy()
        second.putpixel((0, 0), (0, 0, 0, 1))
        canvas.save(out, "WEBP", save_all=True, append_images=[second], duration=1000, loop=0, lossless=True)
    else:
        sys.exit("output must end in .webp (animated slot) or .png (static slot)")


if __name__ == "__main__":
    if len(sys.argv) != 3:
        sys.exit(__doc__)
    main(sys.argv[1], sys.argv[2])
