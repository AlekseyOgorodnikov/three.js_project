varying vec3 v_position;
varying vec2 vUv;

void main(void) {
  vec2 st = v_position.xy;

  vec2 grid = abs(fract(st - 0.5) - 0.5) / fwidth(st);
  float color = min(grid.x, grid.y);

  gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0 - color);
}