import os
from PIL import Image, ImageFilter, ImageEnhance

def enhance_image(input_path, output_path, target_size, unsharp_radius=1.5, unsharp_percent=145, contrast_factor=1.04, sharpness_factor=1.3, quality=86):
    img = Image.open(input_path).convert("RGB")
    
    # 1. High-fidelity Lanczos upscaling to HD/2K
    upscaled = img.resize(target_size, resample=Image.Resampling.LANCZOS)
    
    # 2. Multi-pass detail sharpening
    sharpened = upscaled.filter(ImageFilter.UnsharpMask(radius=unsharp_radius, percent=unsharp_percent, threshold=2))
    
    # 3. Micro-contrast enhancement
    enhancer = ImageEnhance.Contrast(sharpened)
    contrasted = enhancer.enhance(contrast_factor)
    
    # 4. Fine-tuning sharpness
    sharp_enhancer = ImageEnhance.Sharpness(contrasted)
    final_img = sharp_enhancer.enhance(sharpness_factor)
    
    # 5. Save with web-optimized quality=86 (crisp, zero visual artifacts, fast load)
    final_img.save(output_path, "JPEG", quality=quality, optimize=True, progressive=True)
    new_size = os.path.getsize(output_path)
    print(f"  Saved HD image to {output_path}: {target_size[0]}x{target_size[1]} ({new_size // 1024} KB)")

def main():
    base_dir = "frontend/src/photo"
    
    # Desktop Light (2560x1440 QHD)
    enhance_image(
        os.path.join(base_dir, "cherry_blossom_mist.jpg"),
        os.path.join(base_dir, "cherry_blossom_mist.jpg"),
        (2560, 1440),
        quality=85
    )
    
    # Desktop Dark (2560x1440 QHD)
    enhance_image(
        os.path.join(base_dir, "cherry_blossom_mist_dark.jpg"),
        os.path.join(base_dir, "cherry_blossom_mist_dark.jpg"),
        (2560, 1440),
        quality=85
    )
    
    # Mobile Light (1440x2560 QHD Mobile)
    enhance_image(
        os.path.join(base_dir, "cherry_blossom_mist_mobile.jpg"),
        os.path.join(base_dir, "cherry_blossom_mist_mobile.jpg"),
        (1440, 2560),
        quality=85
    )
    
    # Mobile Dark (1440x2560 QHD Mobile)
    enhance_image(
        os.path.join(base_dir, "cherry_blossom_mist_mobile_dark.jpg"),
        os.path.join(base_dir, "cherry_blossom_mist_mobile_dark.jpg"),
        (1440, 2560),
        quality=85
    )

if __name__ == "__main__":
    main()
