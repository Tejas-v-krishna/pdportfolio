export const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const fragmentShader = `
  uniform sampler2D uTexCurrent;
  uniform sampler2D uTexNext;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uImageRes;
  uniform float uWaveFreq;
  uniform float uWavePow;
  uniform float uWaveWidth;
  uniform float uFalloff;
  uniform float uBoostStrength;
  uniform float uCrossfadeWidth;

  varying vec2 vUv;

  // Cover-fit a texture into the full screen
  vec2 coverUv(vec2 uv, vec2 screenRes, vec2 imgRes) {
    float screenAspect = screenRes.x / screenRes.y;
    float imgAspect = imgRes.x / imgRes.y;
    vec2 scale = vec2(1.0);
    if (screenAspect > imgAspect) {
      scale.y = screenAspect / imgAspect;
    } else {
      scale.x = imgAspect / screenAspect;
    }
    return (uv - 0.5) * scale + 0.5;
  }

  void main() {
    float aspectRatio = uResolution.y / uResolution.x;

    // Work in aspect-corrected space
    vec2 coord = vec2(vUv.x, vUv.y * aspectRatio);
    vec2 center = vec2(0.5, 0.5 * aspectRatio);

    float dist = distance(coord, center);

    // Displacement
    vec2 displaced = coord;
    float brightness = 0.0;
    float blend = 0.0;

    if (uProgress > 0.001) {
      float trailing = dist - uProgress;

      if (trailing < uWaveWidth && trailing > 0.0) {
        float decay = exp(-trailing * uFalloff);
        float wave = sin(trailing * uWaveFreq);
        vec2 direction = normalize(coord - center);
        // ADD displacement to current position (the bug fix)
        displaced = coord + direction * wave * uWavePow * decay;
        brightness = abs(wave) * uBoostStrength * decay;
      }

      blend = smoothstep(0.0, uCrossfadeWidth, -(dist - uProgress));
    }

    // Convert back to UV space (0..1)
    vec2 finalUv = vec2(displaced.x, displaced.y / aspectRatio);

    vec2 imgUvCurrent = coverUv(finalUv, uResolution, uImageRes);
    vec2 imgUvNext    = coverUv(finalUv, uResolution, uImageRes);

    vec4 currentColor = texture2D(uTexCurrent, imgUvCurrent);
    vec4 nextColor    = texture2D(uTexNext,    imgUvNext);

    vec4 color = mix(currentColor, nextColor, blend);
    color.rgb += color.rgb * brightness;

    gl_FragColor = color;
  }
`;
