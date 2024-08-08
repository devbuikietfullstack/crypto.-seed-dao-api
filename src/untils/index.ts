export function getInitDataFromUrl(initDataHash: string) {
  const decodedData = decodeURIComponent(initDataHash);

  const dataParams = new URLSearchParams(decodedData);
  return dataParams;
}
