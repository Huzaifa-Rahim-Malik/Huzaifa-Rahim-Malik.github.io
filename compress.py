from PIL import Image, ImageSequence

input_path = "images/LLM_Based_Navigation/demo2.gif"
output_path = "images/LLM_Based_Navigation/demo2.gif"  # Overwrites the original

print("Compressing GIF... This might take a moment.")
with Image.open(input_path) as im:
    # Save with compression and global palette optimization
    frames = [frame.copy() for frame in ImageSequence.Iterator(im)]
    frames[0].save(
        output_path,
        save_all=True,
        append_images=frames[1:],
        optimize=True,
        quality=40, # Lowers file size dynamically
        loop=0
    )
print("Finished compressing!")