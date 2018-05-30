<template>
    <div id="content">
        <h3>List of Users</h3>
        <vuetable
                :api-url="api_url"
                table-wrapper="#content"
                :fields="columns"
                :item-actions="itemActions"
                pagination-path=""

        ></vuetable>
        <vuetable-pagination ref="pagination"></vuetable-pagination>
    </div>
</template>

<script>
    export default {
        name: "pagination-task",
        data: function(){
            return {
                'api_url' : 'http://zhihu.carsonlius_liu.cn/api/tasks',
                columns: [
                    'id',
                    'title',
                    'computed'
                ],
                itemActions: [
                    { name: 'view-item', label: '', icon: 'zoom icon', class: 'ui teal button' },
                    { name: 'edit-item', label: '', icon: 'edit icon', class: 'ui orange button'},
                    { name: 'delete-item', label: '', icon: 'delete icon', class: 'ui red button' }
                ],
                links: {
                    "pagination": {
                        "total": 2,
                        "num_results": 2,
                        "per_page": 10,
                        "num_pages": 1,
                        "current_page": 1,
                        "skip": 0,
                        "from": 1,
                        "to": 10,
                        "last_page": 1
                    }
            }
        }},
        created : function () {
          console.log('hello world');
        },
        methods: {
            viewProfile: function(id) {
                console.log('view profile with id:', id)
            }
        },
        events: {
            'vuetable:action': function(action, data) {
                console.log('vuetable:action', action, data)
                if (action == 'view-item') {
                    this.viewProfile(data.id)
                }
            },
            'vuetable:load-error': function(response) {
                console.log('Load Error: ', response)
            }
        }
    }
</script>

<style scoped>

</style>