function toTree(data) {
    // 删除 所有 children,以防止多次调用
    data.forEach((item) => {
        delete item.childs
    })

    // 将数据存储为 以 id 为 KEY 的 map 索引数据列
    let map = {}
    data.forEach((item) => {
        map[item.id] = item
    })

    let val = []
    data.forEach((item) => {
        // 以当前遍历项，的pid,去map对象中找到索引的id
        let parent = map[item.parentId]
        // 如果找到索引，那么说明此项不在顶级当中,那么需要把此项添加到，他对应的父级中
        if (parent) {
            (parent.childs || (parent.childs = [])).push(item)
        } else {
            //如果没有在map中找到对应的索引ID,那么直接把 当前的item添加到 val结果集中，作为顶级
            val.push(item)
        }
    })

    val.forEach((item) => {
        let entity = {}
        for (let i in item) {
            if (i !== 'childs' && i !== 'entity') {
                entity[i] = item[i]
                delete item[i]
            }
            if (i === 'childs') {
                let children = item[i]
                children.forEach((list) => {
                    let entityTwo = {}
                    for (let key in list) {
                        if (key !== 'childs' && key !== 'entity') {
                            entityTwo[key] = list[key]
                            delete list[key]
                        }
                        if (key === 'childs') {
                            let childres3 = list[key]
                            childres3.forEach((li) => {
                                let entity3 = {}
                                for(let j in li) {
                                    if (j !== 'childs' && j !== 'entity') {
                                        entity3[j] = li[j]
                                        delete li[j]
                                    }
                                    li.entity = entity3
                                }
                            })
                        }
                        list.entity = entityTwo
                    }
                })
            }
            item.entity = entity
        }
    })
    return val
}

function convertToTreeData(data, pid) {
    const result = []
    let temp = []
    for (let i = 0; i < data.length; i++) {
        if (data[i].parentId === pid) {
            let obj = {}
            if (data[i].hasOwnProperty('infoType')) {
                obj = { className: data[i].className, id: data[i].id, parentId: data[i].parentId, parentStr: data[i].parentStr, infoType: Number(data[i].infoType) }
            } else {
                obj = { className: data[i].className, id: data[i].id, parentId: data[i].parentId, parentStr: data[i].parentStr }
            }
            temp = convertToTreeData(data, data[i].id)
            if (temp.length > 0) {
                obj.children = temp
            }
            result.push(obj)
        }
    }
    return result
}

module.exports = {
    toTree: toTree,
    convertToTreeData: convertToTreeData
}
