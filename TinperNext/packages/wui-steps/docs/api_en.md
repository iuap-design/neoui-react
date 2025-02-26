## Step

当任务复杂或具有子任务的系列一定的序列，我们可以将它分解成几个步骤，让事情变得更容易。

## API

### Step

|Property|Description|Type|Default|
|:---|:-----|:----|:------|
|status|自动设置当前step的状态（wait|process|finish|error）|string|-|
|title|step的标题|（string|ReactNode）|-|
|description|step的细节描述，可选的属性|（string|ReactNode）|-|
|icon|设置当前step为icon,可选的属性|string|ReactNode）|-|

### Step.Steps

|Property|Description|Type|Default|
|:---|:-----|:----|:------|
|current|设置当前步骤，从0开始计数。可以使用步骤状态重写此状态。|number|0|
|status|指定当前步骤的状态(danger|info|news|warning|sucess|process)|string|process|
|size|设置step bar的大小(default|samll)|string|default|
|direction|设置step bar的方向(horizontal|vertical)|string|horizontal|




