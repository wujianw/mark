// 根据cityCode fetch 对应区县
export const cityFetchCounty = (areaList,cityCode) => {
    return Promise.resolve(areaList.filter(item => item.parentCode == cityCode))
}
