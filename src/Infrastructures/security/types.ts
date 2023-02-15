export type JwtType = {
  generate: (payload: any, refreshTokenKey: string) => Promise<string>
  decode: (payload: any) => Promise<{ decoded: { payload: any } }>
  verify: (artifacs: any, refreshTokenKey: string) => Promise<void>
}
