varying vec2 vUv;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_texture;
uniform sampler2D map;
uniform float u_animation;

void main() {

  float m = (u_mouse.x / u_resolution.x - 0.5) * 0.01;

  float distort = sin(vUv.y * 100.0 + u_time) * 0.005 + m;

  float map = texture2D(map, vUv).r * u_animation;

  vec4 color = texture2D(u_texture, vec2(vUv.x + distort * map, vUv.y));
  // gl_FragColor = vec4(u_texture.g, u_texture.r, u_texture.b, 1.0);

  gl_FragColor = vec4(color.rgb * (1.0 - map) + map * vec3(color.r + color.g + color.b) / 3.0, 1.0);

}