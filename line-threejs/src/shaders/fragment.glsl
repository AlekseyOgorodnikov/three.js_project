varying vec3 v_position;
varying vec2 vUv;

void main(void) {
  vec2 st = v_position.xy;

  float koef = clamp(v_position.z / 60.0, 0.0, 1.0);

  vec3 color1 = vec3(1., 1., 1.);
  vec3 color2 = vec3(1., 0., 0.);

  vec3 color3 = mix(color1, color2, koef);

  vec2 grid = abs(fract(st / 4. - 0.5) - 0.5) / fwidth(st / 4.);
  float color = min(grid.x, grid.y);

  gl_FragColor = vec4(color3, 1.0 - color);
}